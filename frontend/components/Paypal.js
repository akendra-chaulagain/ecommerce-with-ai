import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

// Sample cart data for PayPal integration
const cartData = {
  amount: 604, // Total cart amount
  items: [
    {
      name: "p1223trt",
      sku: "001",
      price: 30277,
      quantity: 1,
    },
    {
      name: "p1223",
      sku: "002",
      price: 302,
      quantity: 2,
    },
  ],
};

const Paypal = () => {
  const [paypalClientId, setPaypalClientId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch PayPal client ID from environment or API
  useEffect(() => {
    // Fetch PayPal client ID from an environment variable
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID; // Example from .env
    if (!clientId) {
      console.error("PayPal Client ID is missing!");
      return;
    }
    setPaypalClientId(clientId);
  }, []);

  // PayPal order creation - called when the PayPal button is clicked
  const createOrder = async (data, actions) => {
    setLoading(true);
    try {
      // Send the cart details to backend to create the PayPal order
      const response = await axios.post("/api/create-paypal-order", {
        amount: cartData.amount,
        items: cartData.items,
      });

      // Return the order ID to PayPal
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartData.amount.toString(),
            },
            items: cartData.items.map((item) => ({
              name: item.name,
              sku: item.sku,
              unit_amount: {
                value: item.price.toString(),
              },
              quantity: item.quantity,
            })),
          },
        ],
      });
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setLoading(false);
    }
  };

  // Handle payment approval after PayPal user approval
  const onApprove = async (data, actions) => {
    try {
      // Capture payment
      const orderID = data.orderID;
      const response = await axios.post(
        `/api/capture-paypal-order?token=${orderID}`
      );

      // Process successful payment here (e.g., update your DB or redirect user)
      alert("Payment captured successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setLoading(false);
    }
  };

  // Handle payment error
  const onError = (err) => {
    console.error("PayPal error:", err);
    alert("An error occurred with the payment. Please try again.");
    setLoading(false);
  };

  return (
    <div>
      <h2>Checkout with PayPal</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: "USD",
            components: "buttons",
            "disable-funding": "credit,card",
          }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default Paypal;
