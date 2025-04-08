import mongoose from "mongoose";
import { Order } from "../models/order.models.js";

const createOrder = (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      orderStatus,
      paymentStatus,
      totalPrice,
    } = req.body;

    console.log("order ak");

    // Validate required fields
    if (!products || !shippingAddress || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create a new order
    const response = new Order({
      orderId: token,
      userId: req.user.id,
      products,
      shippingAddress,
      orderStatus,
      paymentStatus,
      totalPrice,
    });
    // Save the order to the database
    const orderCreated = response.save();
    if (!orderCreated) {
      return res.status(500).json({ message: "Order creation failed" });
    }
    return res
      .status(201)
      .json({ message: "Order created successfully", response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// get all orders
const getUserAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Match the userId
        },
      },
      {
        $lookup: {
          from: "products", // Lookup product details from "products" collection
          localField: "products.productId", // Match productId inside products array
          foreignField: "_id",
          as: "productDetails", // Store result as "productDetails"
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "p",
              in: {
                $mergeObjects: [
                  {
                    productId: "$$p.productId",
                    quantity: "$$p.quantity",
                  },
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$productDetails",
                          as: "pd",
                          cond: { $eq: ["$$pd._id", "$$p.productId"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          orderId: "$_id", // Map _id to orderId
          userId: 1,
          totalPrice: 1,
          shippingAddress: 1,
          orderStatus: 1,
          paymentStatus: 1,
          transactionId: 1,
          orderDate: 1,
          deliveryDate: 1,
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                productId: "$$product.productId",
                quantity: "$$product.quantity",
                name: "$$product.name",
                price: "$$product.price",
                description: "$$product.description",
                images: "$$product.images",
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json({ message: "All orders", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error please try again", error: error.message });
  }
};
export { createOrder, getUserAllOrders };
