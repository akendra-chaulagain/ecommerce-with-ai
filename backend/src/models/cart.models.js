import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Reference to Product
        quantity: { type: Number, required: true, min: 1 }, // Must be at least 1
      },
    ],

    updatedAt: { type: Date, default: Date.now }, // Track last update time
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
