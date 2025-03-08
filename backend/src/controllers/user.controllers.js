import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  const { name, email, password, role, avatar, contact } = req.body;
  try {
    const uerExist = await User.findOne({ email });
    if (uerExist) {
      return res.status(400).json({ message: "User already exists enter a new email" });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
      contact,
    });

    // const userCreated = user.save();
    return res.status(401).json({ message: "User Created", user });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export { registerUser };
