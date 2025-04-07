"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/context/CartContent";
import { useShippingAddress } from "@/context/ShippingContext";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ✅ Get token from URL
  const [message, setMessage] = useState("Processing payment...");

  // cartitems
  const cart = useCart();
  const cartItems = cart.cart?.items;
  console.log(cartItems);

  const shippingAddress = useShippingAddress();
  const deliverdata = shippingAddress?.shippingAddress?.data;

  useEffect(() => {
    const processPayment = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/v1/payment/capture-payment?token=${token}`,
          { token, cartItems: cartItems },
          { withCredentials: true }
        );
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          console.error("Unexpected capture response:", response.data);
        }
        // ✅ Set success message from server response
      } catch (error) {
        console.error("Payment processing error:", error);
        setMessage("Payment failed. Please try again.");
      }
    };

    if (token) {
      processPayment();
    } else {
      setMessage("No token provided. Please try again.");
    }
  }, [token,cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">{message}</h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
          {token && (
            <span className="block mt-2 font-medium">Order ID: {token}</span>
          )}
        </p>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to your registered email address.
          </p>

          <div className="flex flex-col space-y-3">
            <Link
              href="/order"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              View Order Details
            </Link>

            <Link
              href="/"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Return to Home
            </Link>

            <p className="text-sm text-gray-500">
              {/* Redirecting to dashboard in {countdown} seconds... */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
