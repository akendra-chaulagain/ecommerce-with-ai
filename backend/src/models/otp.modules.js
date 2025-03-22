import mongoose from "mongoose";

// OTP schema definition
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1m" }, // Expires in 10 minutes
});

export const Otp = mongoose.model("Otp", otpSchema);
