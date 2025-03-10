import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { updatePhoto, uploadPhoto } from "../utils/cloudinary.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, contact } = req.body;
    if (!name || !email || !password || contact === undefined) {
      return res.status(400).json({ message: "Enter all the data" });
    }

    const uerExist = await User.findOne({ email });
    if (uerExist) {
      return res
        .status(400)
        .json({ message: "User already exists enter a new email" });
    }

    // password hash
    const hashPassword = bcrypt.hashSync(password, 10);

    const localFilePath = req.file?.path;

    let avatarUpload = null;

    if (localFilePath) {
      avatarUpload = await uploadPhoto(localFilePath);
    }

    // user created
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      // avtar: avtar.url || " ",
      avtar: avatarUpload?.secure_url,
      contact,
    });

    const userData = await User.findById(user._id).select("-password");
    return res.status(401).json({ message: "User Created", userData });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Something went wrong !", error: error.message });
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Enter all the fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("User doesnot exist");
    }
    // compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json("Wrong Password");
    }
    // creating an accesstoken
    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_JSONTOKEN,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    // creating an refreshToken
    const refreshToken = await jwt.sign(
      { id: user._id },
      process.env.REFRESH_JSONTOKEN,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    // save refreshToken in the database
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true, // Prevent XSS attacks
      secure: true, // Send only over HTTPS
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "login successfully",
        loggedInUser,
      });
  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
};

// logout user
const logOutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        refreshToken: null,
      },
      { new: true }
    );

    const options = {
      httpOnly: true, // Prevent XSS attacks
      secure: true, // Send only over HTTPS
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "Logout successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error. Try again later", error: error.message });
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res.status(400).json({ message: "Enter all the fields" });
    }
    if (password === newPassword) {
      return res
        .status(400)
        .json({ message: "old password and new password should not be same" });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// update user
const updateUser = async (req, res) => {
  try {
    const { name, email, contact, role, address } = req.body;

    // Fetch existing user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUserData = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        contact,
        role,
        address,

        // // ...(avtar && { avtar }),
      },
      { new: true },
      { runValidators: true }
    ).select("-password");

    // Send the response
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUserData });
  } catch (error) {
    // If there is an error
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
// update avtar

const updateAvtar = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // this function will run only if the user is uploading the photo athe first time
  if (!user.avtar) {
    const localFilePath = req.file?.path;
    let avatarUpload = null;
    if (localFilePath) {
      avatarUpload = await uploadPhoto(localFilePath);
    }
    user.avtar = avatarUpload?.secure_url;
    await user.save();
    const updatedUserData = await User.findById(req.user.id).select(
      "-password"
    );
    return res
      .status(200)
      .json({ message: "Avtar updated successfully", updatedUserData });
  } else {
    // this will run if user already has an avtar
    let avtar = user.avtar;
    if (req.file?.path) {
      let publicId = user.avtar
        ? user.avtar.split("/").pop().split(".")[0]
        : undefined;

      // Call updatePhoto() with publicId (if exists) and new file path
      const uploadResponse = await updatePhoto(publicId, req.file.path);
      avtar = uploadResponse.secure_url;
    }
    const updatedUserData = await User.findByIdAndUpdate(
      req.user.id,
      {
        avtar,
      },
      { new: true },
      { runValidators: true }
    ).select("-password");
    res
      .status(200)
      .json({ message: "Avtar updated successfully", updatedUserData }); // Send the response
  }
};
// get user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let publicId;
    if (user.avtar) {
      publicId = user.avtar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`photos/${publicId}`);
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  logOutUser,
  updatePassword,
  updateUser,
  updateAvtar,
  getUser,
  deleteUser,
};

// let publicId = user.avtar
//   ? user.avtar.split("/").pop().split(".")[0]
//   : undefined;

// // Call updatePhoto() with publicId (if exists) and new file path
// const uploadResponse = await updatePhoto(publicId, req.file.path);
