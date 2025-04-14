import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { v2 as cloudinary } from "cloudinary";
import {
  updatePhoto,
  uploadMultipleImagesToCloudinary,
} from "../utils/cloudinary.js";
import { Review } from "../models/review.models.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, sku, size, color } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name filed is required fields",
      });
    }
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name filed is required fields",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description filed is required ",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Name filed is required ",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price filed is required ",
      });
    }
    if (!sku) {
      return res.status(400).json({
        success: false,
        message: "SKU filed is required",
      });
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
    const { name, description, price, categoryId, size, color } = req.body;
    const { id } = req.params;

    // find user by req.params.id
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const productImage = await Product.findById(id);
    if (productImage.images.length + req.files.length <= 4) {
      // add images
      const folderName = "products";
      const uploadedImages = await uploadMultipleImagesToCloudinary(
        req.files,
        folderName
      );
      // Append new images to the existing array (instead of replacing)
      productImage.images.push(...uploadedImages);
      // Save the updated product without validation errors
      await productImage.save({ validateBeforeSave: false });
    }

    // console.log(productImage.images.length);

    const updatedProducts = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        categoryId,
        size,
        color,
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

// update product images
const editProductImage = async (req, res) => {
  try {
    const { productId, imagePublicId } = req.params;

    // update images
    const folderName = "products";
    const localImage = req.file.path;
    // console.log(localImage);

    const uploadResponse = await updatePhoto(
      imagePublicId,
      localImage,
      folderName
    );

    const product = await Product.findById(productId);

    // Find index of the image to update
    const imageIndex = product.images.findIndex((img) =>
      img.includes(imagePublicId)
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in product",
      });
    }

    // Replace the specific image in the array
    product.images[imageIndex] = uploadResponse.secure_url;

    // Save the updated product
    await product.save({ validateBeforeSave: false });

    const updatedFields = Object.keys(req.body).join(", ");
    const message = ` ${updatedFields} updated successfully.`;

    return res.status(200).json({
      success: true,
      message,
      product,
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
  editProductImage,
  deleteProduct,
  getAllproducts,
  productDetails,
};
