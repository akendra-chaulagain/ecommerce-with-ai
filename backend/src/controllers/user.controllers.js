import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { uploadPhoto } from "../utils/cloudinary.js";

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

    // local file path
    // const localFilePath = req.file?.path;
    // const avtar = await uploadPhoto(localFilePath);
    // Upload avatar if provided
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
      avtar: avtar?.url, // Ensure secure URL or default
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
    const loggedInUser = await User.findById(user._id).select("-password");
    res.status(200).json({ message: "login successfully", loggedInUser });
  } catch (error) {
    res.status(400).json({ message: "Server error", message: error });
  }
};

export { registerUser, loginUser };
