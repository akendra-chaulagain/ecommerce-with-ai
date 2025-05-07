"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { useCart } from "@/context/CartContent";
import { useShippingAddress } from "@/context/ShippingContext";
import LoadingPage from "@/components/webiste/Loading";
import { axiosInstence } from "@/hooks/axiosInstence";

const PaymentPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("Processing payment...");
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // 🔁

  const cart = useCart();
  const cartItems = cart?.cart?.items;
  const shippingAddress = useShippingAddress();
  const adressId = shippingAddress.shippingAddress?.data?._id;
  const totalPrice = Number(cart?.cart?.totalPrice);
  const hasAttempted = useRef(false);

  // ✅ Detect client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      setToken(urlToken);
      setHasMounted(true); // enable render
    }
  }, []);

  useEffect(() => {
    const processPayment = async () => {
      if (
        !token ||
        !adressId ||
        !Array.isArray(cartItems) ||
        cartItems.length === 0 ||
        isNaN(totalPrice) ||
        totalPrice <= 0 ||
        hasAttempted.current
      ) {
        return;
      }

      hasAttempted.current = true;
      setLoading(true);

      try {
        const response = await axiosInstence.post(
          `/payment/capture-payment?token=${token}`,
          { cartItems, adressId, totalPrice },
          { withCredentials: true }
        );

        setMessage(response.data.message || "Payment processed.");
      } catch (error) {
        console.error("Payment processing error:", error);
        setMessage("Payment failed. Please try again.");
        hasAttempted.current = false;
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [token, adressId, totalPrice, cartItems]);

  // ❌ Don't render on server
  if (!hasMounted) return null;

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
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
                <span className="block mt-2 font-medium">
                  Order ID: {token}
                </span>
              )}
            </p>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-gray-500 mb-4">
                A confirmation email has been sent to your registered email
                address.
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
