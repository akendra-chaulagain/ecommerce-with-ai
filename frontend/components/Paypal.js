"use client";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useShippingAddress } from "@/context/ShippingContext";
import { useCart } from "@/context/CartContent";

// Sample cart data for PayPal integration

const Paypal = ({ totalPrice }) => {
  const [paypalClientId, setPaypalClientId] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useAuth();
  const userName = user?.user?.name;
  const cart = useCart();
  const items = cart.cart.items;

  const shippingAddress = useShippingAddress();
  const deliverdata = shippingAddress.shippingAddress.data;

  // saving the order details in the database
  const shippinId = shippingAddress.shippingAddress.data._id;

  const cartItems = cart.cart.items;

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

  // handle order

  // PayPal order creation - called when the PayPal button is clicked
  const createOrder = async () => {
    setLoading(true);

    try {
      // Send the cart details to backend to create the PayPal order
      const response = await axios.post(
        "http://localhost:5001/api/v1/payment/create-payment",

        {
          total: totalPrice,
          name: userName,
          address: deliverdata,
          cartItems: items,
        },
        { withCredentials: true }
      );
      const approvalUrl = response.data.approvalUrl;

      if (approvalUrl) {
        // Redirect user to PayPal approval URL
        window.location.href = approvalUrl;
        return;
      } else {
        throw new Error("Approval URL not received");
      }

      // Return the order ID to PayPal
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setLoading(false);
      alert("An error occurred while creating the payment. Please try again.");
    }
  };

  const onApprove = async () => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/v1/payment/capture-payment?token=${token}`,

          { withCredentials: true }
        );

        if (response.data.success) {
          alert("Payment captured successfully!");
        } else {
          alert("Payment capture failed.");
        }

        // alert("Payment captured successfully!");
      } catch (err) {
        console.error("Payment capture error:", err);
        alert("Capture failed");
      }
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
