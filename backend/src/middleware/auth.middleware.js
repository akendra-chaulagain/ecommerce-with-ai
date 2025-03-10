import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJwt = async (req, res, next) => {
  //   const token = req.cookies?.accessToken;
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json("Token expired");
    }
    const user = await jwt.verify(token, process.env.ACCESS_JSONTOKEN);
    if (!user) {
      return res.status(401).json("User Logged out, login again");
    }
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "invalid User or Token expired", error: error.message });
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

export { verifyJwt, authorize };
