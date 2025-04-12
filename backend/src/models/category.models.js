import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, unique: true },
    description: {
      type: String,
    },
    categoryImage: {
      type: String,
      required: false,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    }, // Reference to the parent category
  },
  { timestamps: true }
);
// Pre-save hook to generate slug from name
categorySchema.pre("save", function (next) {
  console.log("PRE-SAVE HOOK - Name:", this.name); // should log on save
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema); // Exporting the model
export default Category;
