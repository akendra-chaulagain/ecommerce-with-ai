import mongoose, { Mongoose, Schema, trusted } from "mongoose";

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      requird: true,
    },
    email: {
      type: String,
      requird: true,
      unique: true,
    },
    password: {
      type: String,
      requird: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    orders: { type: Mongoose.Schema.Types.ObjectId, ref: "orders" },
    notification: { type: mongoose.Schema.Types.ObjectId, ref: "notification" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userScheme);
