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
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

// routes decleration
import userRoute from "../src/routes/user.routes.js";

app.use("/api/v1/users", userRoute);
