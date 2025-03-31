import { Cart } from "../models/cart.models.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

// get all product in the cart section of the user
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user.id).select("-password"); // Exclude
    const userId = user._id;

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
      message: "Added to Cart",
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

// delete whole items from cart cart
const deleteFromcart = async (req, res) => {
  try {
    const productId = req.params.id;

    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item does not exist in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate the total price of the cart after deletion
    // Validate the totalPrice calculation to prevent NaN
    cart.totalPrice = cart.items.reduce((total, item) => {
      // Ensure itemTotalPrice is a valid number
      const itemTotal = item.itemTotalPrice || 0; // Default to 0 if invalid
      return total + itemTotal;
    }, 0);

    // If cart is empty after deletion, set total price to 0
    if (cart.items.length === 0) {
      cart.totalPrice = 0;
    }

    // Save the updated cart to the database
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update cart items
// const updateCartItems = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     const userId = req.user.id;
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     // find items from the arry
//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     // check item availabe or not
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: "Item doesnot exist" });
//     }
//     // recalculate price
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product doesnot exist" });
//     }

//     // If quantity is 0, remove the item from the cart
//     if (quantity === 0) {
//       cart.items.splice(itemIndex, 1);
//     } else {
//       // Update the item quantity and calculate item total price
//       cart.items[itemIndex].quantity = quantity;
//       cart.items[itemIndex].itemTotalPrice = quantity * product.price;
//     }
//     // Update quantity and recalculate total price
//     cart.totalPrice = cart.items.reduce(
//       (total, item) => total + item.itemTotalPrice,
//       0
//     );
//     // If cart is empty, set the total price to 0
//     if (cart.items.length === 0) {
//       cart.totalPrice = 0;
//     }
//     // save to database
//     await cart.save();
//     res.status(200).json({ message: "Cart updated", cart });
//     //
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateCartItems = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find item in the cart array
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Check if item exists in the cart
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item does not exist in cart" });
    }

    // Get product details to check the price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    // Ensure quantity is at least 1
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // If quantity is 0, remove the item from the cart
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Update item quantity and recalculate the item total price
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].itemTotalPrice = quantity * product.price;
    }

    // Recalculate the total price of the cart
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.itemTotalPrice,
      0
    );

    // If cart is empty after update, set total price to 0
    if (cart.items.length === 0) {
      cart.totalPrice = 0;
    }

    // Save the updated cart to the database
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get card data acoording to the login user
const getCartAccordingToLoginUser = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id); // Static userId
  try {
    const cartDetails = await Cart.aggregate([
      // Match the cart for the specific user
      { $match: { userId: userId } },

      // Unwind the items array to process each item separately
      { $unwind: "$items" },

      // Lookup product details for each cart item
      {
        $lookup: {
          from: "products", // Collection name for products
          localField: "items.productId",
          foreignField: "_id",
          as: "items.product",
        },
      },

      // Unwind the product array (because `$lookup` returns an array)
      { $unwind: "$items.product" },

      // Restructure the output format
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          totalPrice: { $first: "$totalPrice" },
          items: {
            $push: {
              productId: "$items.product._id",
              name: "$items.product.name",
              description: "$items.product.description",
              image: { $arrayElemAt: ["$items.product.images", 0] },
              price: "$items.product.price",
              quantity: "$items.quantity",
              totalItemPrice: {
                $multiply: ["$items.quantity", "$items.product.price"],
              },
            },
          },
        },
      },
    ]);

    if (!cartDetails.length) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Cart details fetched", cart: cartDetails[0] });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  addToCart,
  deleteFromcart,
  updateCartItems,
  getCartAccordingToLoginUser,
};
