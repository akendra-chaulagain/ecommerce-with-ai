import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    categoryImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema); // Exporting the model
