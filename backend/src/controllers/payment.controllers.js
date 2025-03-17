import { paypalAccesssToken } from "../middleware/paypal.middleware.js";
import axios from "axios";

import dotenv from "dotenv";
import { Payment } from "../models/payment.models.js";
import { verifyOrderStatus } from "../utils/verifyOrderStatus.js";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  try {
    const accessToken = await paypalAccesssToken(); // Get the PayPal access token

    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`, // PayPal endpoint for creating orders
      {
        intent: "CAPTURE", // The intent to capture the payment after approval
        purchase_units: [
          {
            reference_id: "PUHF123456789", // Unique identifier for this purchase unit
            amount: {
              currency_code: "USD", // Currency code (USD in this case)
              value: "25.00", // Total amount for the order
              breakdown: {
                item_total: { currency_code: "USD", value: "25.00" }, // Total amount for items
                shipping: { currency_code: "USD", value: "5.00" }, // Shipping cost
                handling: { currency_code: "USD", value: "1.00" }, // Handling fee
                tax_total: { currency_code: "USD", value: "2.50" }, // Tax amount
                insurance: { currency_code: "USD", value: "0.00" }, // Insurance cost
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
            shipping_address: {
              recipient_name: "John Doe", // Recipient's name
              line1: "1234 Main St", // Address line 1
              line2: "Apt 101", // Address line 2 (if needed)
              city: "Boston", // City
              state: "MA", // State/Province
              postal_code: "02118", // Postal/ZIP code
              country_code: "US", // Country code (US)
            },
          },
        ],
        application_context: {
          return_url: `${PAYPAL_BASE_URL}/success`, // URL to redirect the user after approval
          cancel_url: `${PAYPAL_BASE_URL}/cancel`, // URL to redirect if the user cancels
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the PayPal access token
          "Content-Type": "application/json", // Specify JSON content
        },
      }
    );

    // Extract the order ID from the PayPal response
    const orderID = response.data?.id;

    // Return the order ID as a response
    res.status(200).json({ orderID });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return res.status(500).json({
      message: "Error creating PayPal order",
      error: error.message,
    });
  }
};


const capturePaypalOrder = async (req, res) => {
  try {
    const orderID = req.params.id; // Get order ID from request URL
    console.log(orderID);

    if (!orderID) {
      return res.status(400).json({ error: "Missing order ID" });
    }

    const accessToken = await paypalAccesssToken();

    // const response = await axios.post(
    //   `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
    //   { responseType: "json" }, // Empty body required
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const orderStatus = await verifyOrderStatus(orderID, accessToken);
    if (orderStatus !== "CREATED") {
      return res.status(400).json({
        error: "Order cannot be captured, as it is not in 'CREATED' status",
      });
    }

    // Capture the payment
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

    console.log("Capture Response: ", response.data);

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
