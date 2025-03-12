import { Category } from "../models/category.models.js";
import { updatePhoto, uploadPhoto } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

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
    const folderName = "category";
    let cloudinaryImage = null;
    if (localImage) {
      cloudinaryImage = await uploadPhoto(localImage, folderName);
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
    const { name, description, categoryImage } = req.body;
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (!category.categoryImage) {
      // this code will run only at the first time when categoryImage is not available
      // for category image
      const localImage = req.file?.path;

      let categoryImageUpload = null;
      if (localImage) {
        categoryImageUpload = await uploadPhoto(localImage);
      }
      category.categoryImage = categoryImageUpload?.secure_url;
      await category.save({ validateBeforeSave: false });
    } else {
      // this code will run when categoryImage is already available
      let categoryImage = category.categoryImage;
      const folderName = "category";

      if (req.file?.path) {
        let publicId = category.categoryImage
          ? category.categoryImage.split("/").pop().split(".")[0]
          : undefined;

        // Call updatePhoto() with publicId (if exists) and new file path
        const uploadResponse = await updatePhoto(
          publicId,
          req.file.path,
          folderName
        );
        categoryImage = uploadResponse.secure_url;
      }
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
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // CLOUDINARY IMAGE ALSO NEED TO DELETE WHILE DELETING THE CATEGORY
    if (category.categoryImage) {
      const publicId = category.categoryImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`category/${publicId}`);
      
    }
    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const cetegories = await Category.find();
    return res.status(200).json({
      success: true,
      message: "All categories",
      data: cetegories,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

// get a category details
const categoryDetails = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category details",
      data: category,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

export {
  creatCategory,
  editCategory,
  getAllCategories,
  categoryDetails,
  deleteCategory,
};
