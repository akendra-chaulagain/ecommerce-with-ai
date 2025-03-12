import express from "express";
const app = express();
import connectDb from "./database/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// middleware

// for cookies
app.use(cookieParser());
app.use(express.json());

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

app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
