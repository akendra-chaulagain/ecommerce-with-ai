import mongoose from "mongoose";

const productScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    description: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [{ type: String, default: false }], // Array of image URLs
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  [{ timestamps: true }]
);
export const Product = mongoose.model("Product", productScheme);
