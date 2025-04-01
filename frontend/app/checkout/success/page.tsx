import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const SuccessPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const capturePayment = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `/api/paypal/capture-payment?token=${token}`
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
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Go Home
      </button>
    </div>
  );
};

export default SuccessPage;
