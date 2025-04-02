import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    fullname: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Shipping = mongoose.model("Shipping", shippingSchema);
