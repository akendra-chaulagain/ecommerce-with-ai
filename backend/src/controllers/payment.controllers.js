import { paypalAccesssToken } from "../middleware/paypal.middleware.js";
import axios from "axios";

import dotenv from "dotenv";
import { sendreviewEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";
import { Order } from "../models/order.models.js";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  const {
    address,
    cartItems,
    shippingCost = 0,
    tax = 0,
    discount = 0,
  } = req.body;

  const itemTotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toString();
  const totalAmount =
    parseFloat(itemTotal) +
    parseFloat(shippingCost) +
    parseFloat(tax) -
    parseFloat(discount);
  try {
    const accessToken = await paypalAccesssToken();
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`, // PayPal endpoint for creating orders

      {
        intent: "CAPTURE", // Payment intent (CAPTURE means you want to capture the payment after approval)
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // Currency code (e.g., USD)
              value: totalAmount.toString(), // Total total for the order
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toString(),
                },
              },
            },
            items: cartItems.map((item) => ({
              name: item.name, // Item name
              unit_amount: {
                currency_code: "USD", // Currency code for the item
                value: item.price.toString(), // Price per item
              },
              quantity: item.quantity, // Quantity of the item
              description: item.description, // Item description
              sku: item.productId, // Unique product ID (sku)
            })),
            shipping: {
              name: {
                full_name: address.name, // Name of the recipient
              },
              address: {
                address_line_1: address.street,
                admin_area_2: address.city,
                admin_area_1: address.state,
                postal_code: address.zip.toString(),
                country_code: address.country.trim().slice(0, 2), // Ensure valid country code (e.g., 'US')
              },
            },
          },
        ],
        application_context: {
          return_url: "http://localhost:3000/cart/checkout/success", // URL to redirect after payment approval
          cancel_url: "http://localhost:5001/cart/checkout/cancel-order", // URL to redirect if the user cancels
          user_action: "PAY_NOW", // This ensures the user is prompted to pay immediately
          brand_name: "Your Store", // Your store's brand name
          no_shipping: 1,
          address_override: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // PayPal access token for authorization
          "Content-Type": "application/json", // Content type for JSON requests
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

    // Return the approval URL to the frontend
    res.json({ approvalUrl, orderID: response.data.id });
  } catch (error) {
    console.error("PayPal error:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ message: "Paypal created order error", error: error.message });
  }
};

const capturePaypalOrder = async (req, res) => {
  const { cartItems, shippinId, token } = req.body;
  console.log("cartItems from frontend:", cartItems);
  console.log("shippinId from frontend:", shippinId);
  console.log("token from frontend:", token);

  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ error: "Missing order ID" });
    }

    const accessToken = await paypalAccesssToken();

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

    // saving thr order details in the database when the payment is completed

    // / Extract shipping address from the response
    const orderDetails = response.data.purchase_units[0];
    const shippingAddress = orderDetails.shipping.address;
    const payerDetails = response.data.payer;

    // creating the order in the database
    const order = new Order({
      userId: req.user.id,
      orderId: token,
      // products: req.body.cartItems,
      products: orderDetails.items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        name: shippingAddress.name.full_name,
        street: shippingAddress.address_line_1,
        city: shippingAddress.admin_area_2,
        state: shippingAddress.admin_area_1,
        zip: shippingAddress.postal_code,
        country: shippingAddress.country_code,
      },
      orderStatus: "Approved",
      paymentStatus: "Approved",
      totalPrice:
        response.data.purchase_units[0].payments.captures[0].amount.value,
      transactionId: token,
    });

    // const orderCreated = await order.save();
    // if (!orderCreated) {
    //   return res.status(500).json({ message: "Order creation failed" });
    // }

    // // Send email notification
    // const user = await User.findById(req.user.id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // const emailSubject = "Thank You for Your Order!";
    // const emailText = `Hi ${user.name},\n\nThank you for Ordering. We're excited to let you know that we've received your payment and will begin processing it right away.\n\nOrder ID: ${token}\n\nBest regards,\nYour E-Commerce Team`;
    // await sendreviewEmail(user.email, emailSubject, emailText);
    // res.json({
    //   success: true,
    //   message: "Payment  successfully",
    //   data: response.data,
    // });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error capturing PayPal order", details: error.message });
  }
};

export { createPaypalOrder, capturePaypalOrder };
