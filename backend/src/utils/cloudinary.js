import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadPhoto = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) {
      throw new Error("No file pathway selecetd");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

const updatePhoto = async (publicId, localFilePath, folderName) => {
  try {
    const options = publicId
      ? { public_id: publicId, overwrite: true } // Use existing publicId to overwrite the image
      : {};
    if (!publicId || !localFilePath) {
      throw new Error("Public ID and file path are required");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      ...options,
      folder: folderName,
      type: "upload",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

// Function to upload multiple images to Cloudinary
const uploadMultipleImagesToCloudinary = async (files, folderName) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName, // Change folder name if needed
      });
      return result.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Safely delete files after upload
    files.forEach((file) => {
      const filePath = path.resolve(file.path); // Ensure correct path
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    return uploadedImages;
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error.message);
    throw new Error("Error uploading images");
  }
};

export { uploadPhoto, updatePhoto, uploadMultipleImagesToCloudinary };
