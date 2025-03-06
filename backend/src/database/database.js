import mongoose from "mongoose";

const connectDb = async () => {
  
  try {
    await mongoose.connect(`${process.env.DATABASE}/ecommerce-with-ai`);
    console.log("Database Connetcetd");
  } catch (error) {
    console.log("Database is not connetcted", error);
  }
};
export default connectDb;

export {connectDb}