import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { v2 as cloudinary } from "cloudinary";
import {
  updatePhoto,
  uploadMultipleImagesToCloudinary,
} from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  // console.log(req.body);

  try {
    const {
      name,
      description,
      price,
      categoryId,
      sku,
      size,
      color,
      brand,
      specifications,
      gender,
      material,
    } = req.body;

    const requiredFields = [
      { field: name, fieldName: "Name" },
      { field: description, fieldName: "Description" },
      { field: price, fieldName: "Price" },
      { field: sku, fieldName: "SKU" },
    ];

    for (const { field, fieldName } of requiredFields) {
      if (!field) {
        return res.status(400).json({
          success: false,
          message: `${fieldName} field is required`,
        });
      }
    }

    // multiple images are save in the cloudinary and the urls are returned
    const folderName = "products";

    const uploadImages = await uploadMultipleImagesToCloudinary(
      req.files,
      folderName
    );
    const product = new Product({
      name,
      description,
      price,
      categoryId,
      images: uploadImages,
      sku,
      size,
      color,
      brand,
      specifications,
      gender,
      material,
    });
    const productcreated = await product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: productcreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      sku,
      size,
      color,
      brand,
      specifications,
      gender,
      material,
      discountPrice,
    } = req.body;
    const { id } = req.params;

    // find user by req.params.id
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // multiple images are save in the cloudinary and the urls are returned
    const folderName = "products";

    const uploadImages = await uploadMultipleImagesToCloudinary(
      req.files,
      folderName
    );

    const updatedProducts = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        categoryId,
        sku,
        size,
        color,
        brand,
        specifications,
        gender,
        material,
        discountPrice,
        images: uploadImages,
      },
      { new: true },
      { varlidateBeforeSave: true }
    );

    const updatedFields = Object.keys(req.body).join(", ");
    const message = ` ${updatedFields} updated successfully.`;

    return res.status(200).json({
      success: true,
      message,
      product: updatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    // if (product.images && product.images.length > 0) {
    //   for (const image of product.images) {
    //     const publicId = image.split("/").pop().split(".")[0]; // Extract publicId
    //     await cloudinary.uploader.destroy(`products/${publicId}`);
    //   }
    // }
    const deletedproduct = await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "product deleted", deletedproduct });
  } catch (error) {
    return res.status(401).json({
      message: "server error while deleting product",
      message: error.message,
    });
  }
};

// get all products
const getAllproducts = async (req, res) => {
  try {
    const allproducts = await Product.find();
    return res.status(200).json({
      message: "all products",

      data: allproducts,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error while fetching product",
      message: error.message,
    });
  }
};

// get product details
const productDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await Product.findById(id);
    return res.status(200).json({
      message: "product detail",
      data: details,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error while fetching product",
      message: error.message,
    });
  }
};

export {
  createProduct,
  editProduct,
  deleteProduct,
  getAllproducts,
  productDetails,
};
