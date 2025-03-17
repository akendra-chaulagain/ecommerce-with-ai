import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

export const paypalAccesssToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
      "base64"
    );

    
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Return the access token
    return response.data.access_token;
  } catch (error) {
    // Log the error for debugging
    console.error("Error getting PayPal access token:", error.message);
    throw new Error("Unable to fetch PayPal access token");
  }
};
