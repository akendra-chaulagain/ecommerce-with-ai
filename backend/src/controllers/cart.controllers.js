import { Cart } from "../models/cart.models.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

// get all product in the cart section of the user
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate inputs
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      // Create new cart only if it doesn't exist
      cart = new Cart({
        userId: userId,
        items: [{ productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // Cart exists, check if the product is already in it
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new product to the existing cart
        cart.items.push({
          productId: productId,
          quantity: quantity,
        });
      }

      // Recalculate total price
      let totalPrice = 0;
      for (const item of cart.items) {
        const itemProduct =
          item.productId.toString() === productId.toString()
            ? product
            : await Product.findById(item.productId);

        if (itemProduct && itemProduct.price) {
          totalPrice += item.quantity * itemProduct.price;
        }
      }
      cart.totalPrice = totalPrice;
    }

    // Save the updated cart
    const updatedCart = await cart.save();
    return res.status(200).json({
      message: "Success",
      data: updatedCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export { addToCart };
