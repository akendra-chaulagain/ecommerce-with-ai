"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ✅ Get token from URL
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const capturePayment = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:5001/api/v1/payment/capture-payment?token=${token}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setMessage("Payment successful! 🎉");
        } else {
          setMessage("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error capturing payment:", error);
        setMessage("Error processing payment.");
      }
    };

    capturePayment();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{message}</h1>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Go Home
      </button>
    </div>
  );
};

export default PaymentPage;
