'use client'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { axiosInstence } from "@/hooks/axiosInstence";

const Checkout = () => {
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await  axios.post("/payment/create-payment");
      setApprovalUrl(response.data.approvalUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error creating order:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    createOrder();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {loading ? (
        <p>Loading PayPal payment...</p>
      ) : approvalUrl ? (
        <a
          href={approvalUrl}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Pay with PayPal
        </a>
      ) : (
        <p>Error loading PayPal</p>
      )}
    </div>
  );
};

export default Checkout;
