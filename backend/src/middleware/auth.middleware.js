import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.models.js";
dotenv.config();

// const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.ACCESS_JSONTOKEN);
        req.user = user;
        return next();
      } catch (err) {
        if (err.name !== "TokenExpiredError") {
          console.error("Access token error:", err.message);
          return res.status(401).json({ message: "Invalid access token" });
        }
      }
    }

    // 🔁 Try refreshing the token
    const refreshToken = req.headers["x-refresh-token"];

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JSONTOKEN);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.ACCESS_JSONTOKEN,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        req.user = { id: user._id, role: user.role };

        res.setHeader("x-access-token", newAccessToken);

        return next();
      } catch (error) {
        console.error("Refresh token error:", error.message);
        return res
          .status(401)
          .json({ message: "Refresh token expired or invalid" });
      }
    }

    return res.status(401).json({ message: "Unauthorized. Please login." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Authorize middleware to restrict access based on user role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

const verifyTemporaryToken = async (req, res, next) => {
  const tempToken = req.cookies.tempToken;
  console.log("trmp token", tempToken);

  if (!tempToken) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      tempToken,
      process.env.TEMPORARY_ACCESS_JSONTOKEN
    );
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { verifyJwt, authorize, verifyTemporaryToken };
