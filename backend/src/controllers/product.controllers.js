import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import {
  updatePhoto,
  uploadMultipleImagesToCloudinary,
} from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields",
      });
    }
    // use the cloudinary upload method to upload the images to cloudinary
    // the upload method takes the file path and an object with the folder key set to products
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images are required" });
    } else if (req.files.length > 4) {
      return res
        .status(400)
        .json({ success: false, message: "You can upload up to 4 images" });
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

export { createProduct, editProduct, editProductImage };
