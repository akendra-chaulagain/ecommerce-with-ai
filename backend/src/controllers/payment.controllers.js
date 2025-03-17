import { paypalAccesssToken } from "../middleware/paypal.middleware.js";
import axios from "axios";

import dotenv from "dotenv";
import { Payment } from "../models/payment.models.js";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  try {
    const accessToken = await paypalAccesssToken();
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: "20.00" } }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const capturePaypalOrder = async (req, res) => {
  try {
    const  orderID  = req.params;
    console.log(orderID.id);
    
    
    const accessToken = await paypalAccesssToken();

    // Capture payment
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    

    const paymentData = response.data;
    console.log(paymentData);
    
    // if (paymentData.status === "COMPLETED") {
    //   // Extract necessary details
    //   const transaction = new Payment({
    //     orderId: paymentData.id,
    //     payerId: paymentData.payer.payer_id,
    //     paymentMethod: paymentData.payment_source.paypal ? "PayPal" : "Unknown",
    //     amount: paymentData.purchase_units[0].payments.captures[0].amount.value,
    //     currency:
    //       paymentData.purchase_units[0].payments.captures[0].amount
    //         .currency_code,
    //     status: paymentData.status,
    //     create_time: paymentData.create_time,
    //     update_time: paymentData.update_time,
    //   });

    //   // Save transaction
    //   await transaction.save();
    //   res.json({
    //     success: true,
    //     message: "Payment captured and saved",
    //     transaction,
    //   });
    // } else {
    //   res
    //     .status(400)
    //     .json({
    //       success: false,
    //       message: "Payment not completed",
    //       paymentData,
    //     });
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPaypalOrder, capturePaypalOrder };
