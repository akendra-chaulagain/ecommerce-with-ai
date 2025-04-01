import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

export const paypalAccesssToken = async () => {
  try {
    const credentials = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token; // ✅ Return the access token
  } catch (error) {
    console.error(
      "PayPal Access Token Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get PayPal access token.");
  }
};
