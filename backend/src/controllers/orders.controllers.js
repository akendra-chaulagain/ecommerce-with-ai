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
      { $sort: { _id: -1 } }, // Add this in your pipeline
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

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Skip number of orders based on page

    // Fetch total count for pagination
    const totalOrders = await Order.countDocuments();

    // Fetch paginated orders with sorting
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .skip(skip) // Skip the documents for pagination
      .limit(limit); // Limit the number of documents fetched

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      data: orders,
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: error.message,
    });
  }
};

// get order details
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orders = await Order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $addFields: {
          "products.details": "$productInfo",
        },
      },

      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          orderId: { $first: "$orderId" },
          totalPrice: { $first: "$totalPrice" },
          shippingAddress: { $first: "$shippingAddress" },
          orderStatus: { $first: "$orderStatus" },
          paymentStatus: { $first: "$paymentStatus" },
          transactionId: { $first: "$transactionId" },
          taxAmount: { $first: "$taxAmount" },
          deliveryDate: { $first: "$deliveryDate" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: { $push: "$products" }, // product IDs, quantity, etc.
          productDetails: { $push: "$productInfo" }, // separate top-level product details
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $lookup: {
          from: "shippings",
          localField: "shippingAddress",
          foreignField: "_id",
          as: "shippinDetails",
        },
      },
      {
        $unwind: "$shippinDetails",
      },
      {
        $project: {
          shippingAddress: 0,

          userDetails: {
            password: 0,
            role: 0,
            avtar: 0,
          },
        },
      },
    ]);
    return res.status(200).json({ message: "All orders", order: orders[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error please try again", error: error.message });
  }
};

export { createOrder, getUserAllOrders, getAllOrders, getOrderDetails };
