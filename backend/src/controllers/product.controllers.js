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
      { field: color, fieldName: "color" },
      { field: size, fieldName: "size" },
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

      brand,
      specifications,
      gender,
      material,
      discountPrice,
      size,
      color,
    } = req.body;
    // const size = JSON.parse(req.body.size);
    // const color = JSON.parse(req.body.color);

    const { id } = req.params;

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const folderName = "products";
    let uploadImages = product.images; // start with existing images

    // Upload new images if provided and merge them
    if (req.files && req.files.length > 0) {
      const newImages = await uploadMultipleImagesToCloudinary(
        req.files,
        folderName
      );
      uploadImages = [...product.images, ...newImages];
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
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
      {
        new: true, // return the updated document
        validateBeforeSave: true,
      }
    );

    const updatedFields = Object.keys(req.body).join(", ");
    const message = `${updatedFields} updated successfully.`;

    return res.status(200).json({
      success: true,
      message,
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// delete image
const deleteImgae = async (req, res) => {
  try {
    const imageId  = req.params.id;
    console.log(imageId);
  } catch (error) {
    return res.status(401).json({
      message: "server error while deleting product",
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        const publicId = image.split("/").pop().split(".")[0]; // Extract publicId
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }
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
  deleteImgae,
};
