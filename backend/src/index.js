import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDb from "./database/database.js";
import cookieParser from "cookie-parser";
dotenv.config();

// middleware

// for cookies
app.use(cookieParser());

// database connected
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
