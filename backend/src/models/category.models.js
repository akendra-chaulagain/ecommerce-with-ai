import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
    trim: true,
  },
  description: {
    type: string,
  },
  categoryImage: {
    type: string,
    required: false,
  },
});

export default Category = mongoose.model("category", categorySchema); // Exporting the model
