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
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createOrder };
