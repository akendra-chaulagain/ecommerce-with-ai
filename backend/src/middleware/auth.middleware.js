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

const verifyTemporaryToken = async (req, res,next) => {
  const tempToken = req.cookies.tempToken; // Get the token from the cookies
  // console.log(tempToken);

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

    next(); // Procee
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { verifyJwt, authorize, verifyTemporaryToken };
