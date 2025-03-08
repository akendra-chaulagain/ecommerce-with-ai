import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadPhoto = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file pathway selecetd");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "photos",
      resource_type: "auto",
    });
    
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
   
  }
};

export { uploadPhoto };
