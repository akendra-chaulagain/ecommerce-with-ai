import { paypalAccesssToken } from "../middleware/paypal.middleware.js";
import axios from "axios";

import dotenv from "dotenv";
import { sendreviewEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";
import { Order } from "../models/order.models.js";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  const { address, cartItems, discount = 0 } = req.body;

  // Constants
  const shippingCost = 5.99;


  // Calculate item total
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = parseFloat((itemTotal * 0.13).toFixed(2)); // 13% tax

  const totalAmount = parseFloat(
    (itemTotal + shippingCost + tax - discount).toFixed(2)
  );

  try {
    const accessToken = await paypalAccesssToken();
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: itemTotal.toFixed(2),
                },
                shipping: {
                  currency_code: "USD",
                  value: shippingCost.toFixed(2),
                },
                tax_total: {
                  currency_code: "USD",
                  value: tax.toFixed(2),
                },
                discount: {
                  currency_code: "USD",
                  value: parseFloat(discount).toFixed(2),
                },
              },
            },
            items: cartItems.map((item) => ({
              name: item.name,
              unit_amount: {
                currency_code: "USD",
                value: item.price.toFixed(2),
              },
              quantity: item.quantity,
              description: item.description,
              sku: item.productId,
            })),
            shipping: {
              name: {
                full_name: address.name,
              },
            },
          },
        ],
        application_context: {
          return_url: "http://localhost:3000/cart/checkout/success",
          cancel_url: "http://localhost:5001/cart/checkout/cancel-order",
          user_action: "PAY_NOW",
          brand_name: "Your Store",
          shipping_preference: "NO_SHIPPING", // << THIS hides the address section
        },
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const approvalUrl = response.data.links.find(
      (link) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      return res
        .status(400)
        .json({ message: "Approval URL not found in PayPal response" });
    }

    res.json({ approvalUrl, orderID: response.data.id });
  } catch (error) {
    console.error("PayPal error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ message: "Paypal created order error", error: error.message });
  }
};

const capturePaypalOrder = async (req, res) => {
  const { cartItems, adressId, totalPrice } = req.body;

  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ error: "Missing order ID" });
    }
    // Check if the order already exists and if payment has already been processed
    const existingOrder = await Order.findOne({ orderId: token });

    if (existingOrder) {
      if (existingOrder.paymentStatus === "Approved") {
        return res.status(200).json({
          success: false,
          message: "Payment has already been processed for this order.",
        });
      }
    }

    const accessToken = await paypalAccesssToken();

    const attempCaptureOne = async () => {
      try {
        const response = await axios.post(
          `${PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
          {}, // Empty body required
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const cleanTotalPrice = Number(totalPrice);
        if (isNaN(cleanTotalPrice)) {
          return res.status(400).json({
            error: "Invalid totalPrice: Value became NaN after casting",
            originalValue: totalPrice,
          });
        }

        // creating the order in the database
        const order = new Order({
          userId: req.user.id,
          orderId: token,
          // products: req.body.cartItems,
          products: cartItems?.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shippingAddress: adressId,
          orderStatus: "Approved",
          paymentStatus: "Approved",
          totalPrice: cleanTotalPrice,
          transactionId: token,
        });

        const orderCreated = await order.save();
        if (!orderCreated) {
          return res.status(500).json({ message: "Order creation failed" });
        }

        // Send email notification
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const emailSubject = "Thank You for Your Order!";
        const emailText = `Hi ${user.name},\n\nThank you for Ordering. We're excited to let you know that we've received your payment and will begin processing it right away.\n\nOrder ID: ${token}\n\nBest regards,\nYour E-Commerce Team`;
        await sendreviewEmail(user.email, emailSubject, emailText);
        res.json({
          success: true,
          message: "Payment  successfully",
          data: response.data,
        });
      } catch (error) {
        console.error("Error capturing PayPal order:", error);
        res.status(500).json({
          error: "Error capturing PayPal order",
          details: error.message,
        });
      }
    };

    await attempCaptureOne();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error capturing PayPal order", details: error.message });
  }
};

export { createPaypalOrder, capturePaypalOrder };
