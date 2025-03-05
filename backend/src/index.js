import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDb from "./database/database.js";
dotenv.config();


connectDb()

app.listen(process.env.PORT || 6000, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
