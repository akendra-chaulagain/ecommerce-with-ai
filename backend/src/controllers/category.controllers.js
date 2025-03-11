import { Category } from "../models/category.models.js";
import { updatePhoto, uploadPhoto } from "../utils/cloudinary.js";

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
const editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const category = await Category.findById(id);

    // for category image
    if (!category.categoryImage) {
      // for category image
      const localImage = req.file?.path;

      let categoryImageUpload = null;
      if (localImage) {
        categoryImageUpload = await uploadPhoto(localImage);
      }
      category.categoryImage = categoryImageUpload?.secure_url;
      await category.save();

      const updatedCategory = await Category.findById(id);
      return res.status(201).json({
        success: true,
        message: "Category updated",
        data: updatedCategory,
      });
    } else {
      let categoryImage = category.categoryImage;

      if (req.file?.path) {
        let publicId = category.categoryImage
          ? category.categoryImage.split("/").pop().split(".")[0]
          : undefined;

        // Call updatePhoto() with publicId (if exists) and new file path
        const uploadResponse = await updatePhoto(publicId, req.file.path);
        categoryImage = uploadResponse.secure_url;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          name,
          categoryImage,
          description,
        },
        {
          new: true,
        }
      );

      return res.status(201).json({
        success: true,
        message: "Category updated",
        data: updatedCategory,
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

export { creatCategory, editCategory };
