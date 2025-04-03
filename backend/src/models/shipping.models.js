import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // address: {
    //   street: String,
    //   city: String,
    //   state: String,
    //   zip: String,
    //   country: String,
    // },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Shipping = mongoose.model("Shipping", shippingSchema);
