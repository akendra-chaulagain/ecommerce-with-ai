import mongoose, { Mongoose, Schema, trusted } from "mongoose";

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    avtar: {
      type: String,
    },

    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    refreshToken: {
      type: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    orders: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
    notification: { type: mongoose.Schema.Types.ObjectId, ref: "notification" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userScheme);
