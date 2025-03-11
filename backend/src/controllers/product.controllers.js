import { Product } from "../models/product.models.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadMultipleImagesToCloudinary } from "../utils/cloudinary.js";

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
    }


    // Upload multiple images to Cloudinary
    // const imageUploadPromises = req.files.map(async (file) => {
    //   const result = await cloudinary.uploader.upload(file.path, {
    //     folder: "products",
    //   });
    //   return result.secure_url;
    // });
    // const uploadedImages = await Promise.all(imageUploadPromises);

    // multiple images are save in the cloudinary and the urls are returned
    const uploadImages = await uploadMultipleImagesToCloudinary(req.files);
    console.log(uploadImages);
    
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

export { createProduct };
