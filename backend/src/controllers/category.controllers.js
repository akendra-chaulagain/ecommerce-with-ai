import mongoose from "mongoose";
import Category from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import { updatePhoto, uploadPhoto } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

// updated create category (new category using parent and child)
const creatCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;

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
    const newCategory = new Category({
      name,

      parentCategory: parentCategory, // Set to null if no parent category is provided
      description,
      categoryImage: cloudinaryImage?.secure_url,
    });
    await newCategory.save(); // Save the new category to the database

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
    const { name, description, parentCategory } = req.body;

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
          folderName,
          parentCategory
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
  // try {
  //   // for pagination
  //   const page = parseInt(req.query.page) || 1; // default page is 1
  //   const limit = parseInt(req.query.limit) || 7; // default limit is 10
  //   const skip = (page - 1) * limit; // calculate skip value
  //   const totalCategories = await Category.countDocuments(); // get total number of categories

  //   const cetegories = await Category.find()
  //     .skip(skip)
  //     .limit(limit)
  //     .sort({ createdAt: -1 });

  //   return res.status(200).json({
  //     success: true,
  //     message: "All categories",
  //     data: cetegories,
  //     pagination: {
  //       currentPage: page,
  //       totalPages: Math.ceil(totalCategories / limit),
  //       totalItems: totalCategories,
  //     },
  //   });
  // } catch (error) {
  //   res.status(501).json({
  //     success: false,
  //     message: "Something went wrong! try again later",
  //     error: error.message,
  //   });
  // }
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
// get subcategories
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await Category.find({
      parentCategory: req.params.id,
    });
    if (!subCategories) {
      return res.status(404).json({
        success: false,
        message: "Subcategories not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Subcategories",
      data: subCategories,
    });
  } catch (error) {
    return res.status(501).json({
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

const categoryTree = async (req, res) => {
  try {
    const allCategories = await Category.find().lean();
    // recursive function to build the tree

    const buildTree = (categories, parentId = null) => {
      // Filter categories that belong to the current parent
      const filtered = categories.filter((cat) => {
        if (!parentId) return !cat.parentCategory;
        return cat.parentCategory?.toString() === parentId.toString();
      });

      // Map filtered categories into nested objects
      return filtered.map((cat) => ({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        categoryImage: cat.categoryImage,
        children: buildTree(categories, cat._id), // Recursively find children
      }));
    };
    const tree = buildTree(allCategories, null);
    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    console.error("Error fetching category tree:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
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
  getSubCategories,
  categoryTree,
};
