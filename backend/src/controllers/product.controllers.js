import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadMultipleImagesToCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
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
    const imageId = req.params.id;
    const productId = req.query.productId;
    const imageUrl = req.query.imageUrl;

    // find product
    if (imageId) {
      await cloudinary.uploader.destroy(`products/${imageId}`);
    }

    await Product.findByIdAndUpdate(productId, {
      $pull: {
        images: imageUrl,
      },
    });

    return res.status(200).json("Image deleted");
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
const getAllUniqueAttributes = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      { color: 1, size: 1, material: 1, brand: 1 }
    );

    const allColors = [];
    const allSizes = [];
    const allMaterials = [];
    const allBrands = [];

    products.forEach((product) => {
      if (product.color) {
        const colors = product.color
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .filter((c) => c.length > 0);
        allColors.push(...colors);
      }

      if (product.size) {
        const sizes = product.size
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter((s) => s.length > 0);
        allSizes.push(...sizes);
      }

      if (product.material) {
        const materials = product.material
          .split(",")
          .map((m) => m.trim().toLowerCase())
          .filter((m) => m.length > 0);
        allMaterials.push(...materials);
      }

      if (product.brand) {
        allBrands.push(product.brand.trim().toLowerCase());
      }
    });

    return res.status(200).json({
      success: true,
      filters: [
        {
          name: "Color",
          values: [...new Set(allColors)],
        },
        {
          name: "Size",
          values: [...new Set(allSizes)],
        },
        {
          name: "Material",
          values: [...new Set(allMaterials)],
        },
        {
          name: "Brand",
          values: [...new Set(allBrands)],
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching product attributes",
      error: error.message,
    });
  }
};

const getProductsByCategoryAndFilters = async (req, res) => {
  const { categoryId, color, material, size, brand } = req.query;

  if (!categoryId) {
    return res.status(400).json({
      message: "Category ID is required",
    });
  }

  try {
    // Build dynamic match stage based on provided filters
    const matchStage = {
      categoryId: new mongoose.Types.ObjectId(categoryId),
    };

    if (color) {
      matchStage.color = { $regex: new RegExp(`\\b${color}\\b`, "i") }; // case-insensitive regex for color
    }

    if (material) {
      matchStage.material = { $regex: new RegExp(`\\b${material}\\b`, "i") }; // case-insensitive regex for material
    }

    if (size) {
      matchStage.size = { $regex: new RegExp(`\\b${size}\\b`, "i") };
    }

    if (brand) {
      matchStage.brand = {
        $regex: new RegExp(`\\b${brand}\\b`, "i"),
      };
    }

    const products = await Product.aggregate([
      { $match: matchStage }, // Apply filters dynamically
      {
        $project: {
          _id: 1,
          name: 1,
          categoryId: 1,
          color: 1,
          material: 1,
          size: 1,
          price: 1,
          brand: 1,
          images: 1,
          description: 1,
          discountPrice:1

          // You can add more fields as needed
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const getNineProductForHomePage = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8); // Mongoose method
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};

// const getAllproducts = async (req, res) => {
//   try {

//     const allproducts = await Product.find().sort({ createdAt: -1 });
//     return res.status(200).json({
//       message: "all products",

//       data: allproducts,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       message: "server error while fetching product",
//       message: error.message,
//     });
//   }
// };

const getAllproducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const allproducts = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Sort by creation date (descending)

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      data: allproducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while fetching products",
      error: error.message,
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
  getAllUniqueAttributes,
  getProductsByCategoryAndFilters,
  getNineProductForHomePage,
};
