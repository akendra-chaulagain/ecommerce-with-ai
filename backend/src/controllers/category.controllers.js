import mongoose from "mongoose";
import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import { updatePhoto, uploadPhoto } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { PaginationParameters } from "mongoose-paginate-v2";

// create catehory
const creatCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return new Error("Name is required");
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Category image is required" });
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
      .status(200)
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

    // console.log("image akendra",req.file.path);
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const folderName = "category";
    let Image = category.categoryImage;

    // Upload image if file is provided

    if (req.file?.path) {
      if (!category.categoryImage) {
        // first time uploading
        const uploadResponse = await uploadPhoto(req.file.path, folderName);
        Image = uploadResponse.secure_url;
      } else {
        // replacing existing image
        const publicId = category.categoryImage
          ? category.categoryImage.split("/").pop().split(".")[0]
          : undefined;
        console.log("Public ID:", publicId); // Log the public ID

        const uploadResponse = await updatePhoto(
          publicId,
          req.file.path,
          folderName
        );
        Image = uploadResponse.secure_url;
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        categoryImage: Image, // ✅ Now correctly updated
      },
      { new: true }
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
    const cetegories = await Category.find().sort({ createdAt: -1 });
    // const cetegories = await Category.paginate({}, { page: 1, limit: 10 }); // Mongoose method
    // const cetegories = await Category.paginate({}, { page: 1, limit: 10 });
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

const getFiveDataForHomeScreen = async (req, res) => {
  try {
    const categories = await Category.find().limit(6); // Mongoose method
    return res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    return res.status(501).json({
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

// get products according to the category
const getProductsAcoordingToCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const checkCategory = await Category.findById(id);

    if (!checkCategory) {
      return res.status(404).json({ message: "Category doesnot exist" });
    }

    const products = await Category.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          // $match: { product: new mongoose.Types.ObjectId(id) }, // Match reviews based on product ID
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "products according to category", products });
  } catch (error) {
    return res.status(401).json({
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
  getFiveDataForHomeScreen,
  getProductsAcoordingToCategory,
};
