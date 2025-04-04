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
  console.log("total amount:", totalPrice);
  const cartItems = cart.cart.items;
  console.log("Shipping ID:", shippinId);
  console.log("total amount:", totalPrice);
  console.log("total amount:", cartItems);

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
  const handleOrder = async (payment) => {
    try {
      // Send cartItems along with other data (totalPrice, shippingAddress, etc.)
      const response = await axios.post(
        "http://localhost:5000/api/create-orders", // Your backend API endpoint
        {
          products: cartItems, // Send cart items to the backend
          totalPrice, // Total price of the order
          paymentStatus: "Approved", // Payment status
          transactionId: payment.id, // PayPal transaction ID
          shippingAddress: selectedAddress, // Shipping address for the order
        },
        {
          withCredentials: true, // Send cookies (if using authentication)
        }
      );

      if (response.data.success) {
        alert("Order placed successfully!");
        // Redirect user or update UI after successful order creation
      }
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error);
    }
  };

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
      }

      // Return the order ID to PayPal
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setLoading(false);
      alert("An error occurred while creating the payment. Please try again.");
    }
  };

  // Handle payment approval after PayPal user approval
  const onApprove = async (data, actions) => {
    try {
      const orderID = data.orderID;

      if (!orderID) {
        console.error(" No order ID provided!");
        alert(" No order ID received.");
        return;
      }

      // Capture payment via PayPal SDK
      const captureResponse = await actions.order.capture();
      console.log("Capture Response:", captureResponse);

      // Send token as query param for backend processing
      await axios.get(
        `http://localhost:5001/api/v1/payment/capture-payment?token=${token}`,
        { withCredentials: true }
      );

      alert("Payment captured successfully!");

      setLoading(false);
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      alert("Error capturing PayPal payment. Please try again.");
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
