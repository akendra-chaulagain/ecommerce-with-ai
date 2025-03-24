import mongoose from "mongoose";

// OTP schema definition
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, }, // Expires in 1 minutes
});
// Create TTL index that expires after 60 seconds
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

export const Otp = mongoose.model("Otp", otpSchema);




