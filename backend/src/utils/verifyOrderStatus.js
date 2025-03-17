import axios from "axios";
const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

export const verifyOrderStatus = async (orderID, accessToken) => {
  try {
    const response = await axios.get(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Order Status: ", response.data.status);
    
    
    return response.data.status;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};
