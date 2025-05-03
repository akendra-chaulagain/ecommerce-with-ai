import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.models.js";
dotenv.config();

const verifyJwt = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    // to verify the access token
    if (accessToken) {
      try {
        if (!accessToken) {
          return res.status(401).json("No token access provideds");
        }
        const user = await jwt.verify(
          accessToken,
          process.env.ACCESS_JSONTOKEN
        );
        if (!user) {
          return res.status(401).json("User Logged out, login again");
        }
        req.user = user;

        next();
      } catch (error) {
        return res.status(401).json({
          message: "invalid User or Token expired",
          error: error.message,
        });
      }
    }

    // verify refresh token and create a access token
    if (refreshToken) {
      try {
        if (!refreshToken) {
          return res.status(401).json("No token refresh token provideds");
        }
        const decodeToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_JSONTOKEN
        );
        const user = await User.findById(decodeToken.id);

        // create a new access token
        const newAccessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.ACCESS_JSONTOKEN,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
        });

        req.user = { id: user._id, role: user.role };
        return next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Refresh token expired or invalid" });
      }
    }
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
