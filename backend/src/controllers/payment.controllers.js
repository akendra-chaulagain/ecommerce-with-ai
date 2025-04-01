import { paypalAccesssToken } from "../middleware/paypal.middleware.js";
import axios from "axios";

import dotenv from "dotenv";
import { Payment } from "../models/payment.models.js";
import { verifyOrderStatus } from "../utils/verifyOrderStatus.js";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  try {
    const accessToken = await paypalAccesssToken();
   
    
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`, // PayPal endpoint for creating orders
      {
        intent: "CAPTURE", // The intent to capture the payment after approval
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // Currency code (USD in this case)
              value: "25.00", // Total amount for the order
              breakdown: {
                item_total: { currency_code: "USD", value: "25.00" }, // Total amount for items
              },
            },
            items: [
              {
                name: "Red Sox Hat", // Item name
                sku: "001", // Item SKU
                unit_amount: { currency_code: "USD", value: "25.00" }, // Price per unit
                quantity: 1, // Quantity of this item in the order
              },
            ],
          },
        ],
        application_context: {
          return_url: `http://localhost:5001/success`, // URL to redirect the user after approval
          cancel_url: `http://localhost:5001/cancel-order`, // URL to redirect if the user cancels
          user_action: "PAY_NOW", // This ensures the user is prompted to pay immediately
          brand_name: "Ak Store", // This is the brand name that will appear on the PayPal page
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the PayPal access token
          "Content-Type": "application/json", // Specify JSON content
        },
      }
    );
    // const order = response;
    // const orderID = response.data?.id;
    // return response.order.data.links.find((link) => link.rel === "approve").href;
    const approvalUrl = response.data.links.find(
      (link) => link.rel === "approve"
    ).href;
    res.json({ approvalUrl });
    // console.log(approvalUrl);

    // res.status(200).json({ orderID, order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "paypal created order error", error: error.message });
  }
};

const capturePaypalOrder = async (req, res) => {
  try {
    const orderID = req.query.token;
    console.log(orderID);

    if (!orderID) {
      return res.status(400).json({ error: "Missing order ID" });
    }

    const accessToken = await paypalAccesssToken();

    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {}, // Empty body required
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      message: "Payment captured successfully",
      data: response,
    });
  } catch (error) {
    console.log("ak");
    res
      .status(500)
      .json({ error: error.message, message: "error while capture data" });
  }
};

export { createPaypalOrder, capturePaypalOrder };
