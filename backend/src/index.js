import express from "express";
const app = express();
import connectDb from "./database/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import emitter from "events";
emitter.setMaxListeners(20);


// for cookies
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "https://ak-store-six.vercel.app/", // Allow only requests from this origin
    credentials: true, // Allow cookies
  })
);
app.use(express.json()); // Enable JSON body parsing

// database connected
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5002, () => {
      console.log(`server is running at port ${process.env.PORT || 5002}`);
    });
  })

  .catch((err) => {
    console.log("connection failed", err);
  });

// routes decleration
import userRoute from "../src/routes/user.routes.js"; //user routes
import categoryRoute from "../src/routes/category.routes.js"; //category routes
import productRoute from "../src/routes/product.routes.js"; //category routes
import reviewRoute from "../src/routes/review.routes.js"; //review routes
import cartRoute from "../src/routes/cart.routes.js";
import shippingRoute from "../src/routes/shipping.routes.js";
import paymentRoute from "../src/routes/payment.routes.js";
import orderRoute from "../src/routes/order.routes.js";
import searchRoute from "../src/routes/search.routes.js";
// import orderRoute from "../src/routes/order.routes.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/shipping", shippingRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/api/v1/order", orderRoute);
app.use("/api/v1/search", searchRoute);
// app.use("/api/v1/order", cartRoute);
