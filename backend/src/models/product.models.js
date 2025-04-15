import mongoose from "mongoose";

const productScheme = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    discountPrice: { type: Number, default: 0 },
    brand: { type: String },
    sku: { type: Number },
    color: [String],
    size: [String],
    material: String,
    gender: { type: String, enum: ["men", "women", "unisex", "kids"] },
    isActive: { type: Boolean, default: true },
    specifications: { type: String },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [{ type: String, default: false }], // Array of image URLs
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  [{ timestamps: true }]
);
export const Product = mongoose.model("Product", productScheme);
