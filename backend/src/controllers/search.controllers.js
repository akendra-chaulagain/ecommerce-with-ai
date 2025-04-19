import dotenv from "dotenv";
import Category from "../models/category.models.js";
import { Product } from "../models/product.models.js";

dotenv.config();

const searchFromDatabase = async (req, res) => {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ message: "Search term is required" });
  }
  try {
    // rull search on category and products
    const [categorys, products] = await Promise.all([
      Category.find(
        { $text: { $search: term } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } }),

      Product.find(
        { $text: { $search: term } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } }),

     
      
    ]);
    res.status(200).json({
      category: categorys,
      product: products,
     
      
    });
  } catch (error) {
    console.error("Search error:", error); // Log full error
    res.status(500).json({ message: "Server error while searching" });
  }
};

export { searchFromDatabase };
