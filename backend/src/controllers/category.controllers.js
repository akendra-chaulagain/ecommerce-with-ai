import { Category } from "../models/category.models.js";
import { uploadPhoto } from "../utils/cloudinary.js";

// create catehory
const creatCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw new Error("Name is required");
    }
    // search for existing category
    const category = await Category.findOne({ name });
    if (category) {
      return res
        .status(201)
        .json({ success: false, message: "Category already exists" });
    }

    // for category image
    const localImage = req.file?.path;
    let cloudinaryImage = null;
    if (localImage) {
      cloudinaryImage = await uploadPhoto(localImage);
    }

    // create new category
    const newCategory = await Category.create({
      name,
      description,
      categoryImage: cloudinaryImage?.secure_url,
    });
    return res
      .status(201)
      .json({ success: true, message: "Category added", data: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};
//  edit category
const editCategory = async(req,res)=>{
  
}

export { creatCategory };
