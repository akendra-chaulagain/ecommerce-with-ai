import mongoose from "mongoose";

const connectDb = async () => {
  //   try {
  //     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  //     //    `mongodb+srv://akendra:akendra@cluster0.zhwmt.mongodb.net/${DB_NAME}`;

  //     console.log("Database Connetcetd");
  //   } catch (error) {
  //     console.log("Database is not connetcted", error);
  //   }
  // };
  try {
    await mongoose.connect(`${process.env.DATABASE}/ecommerce-with-ai`);
    console.log("Database Connetcetd");
  } catch (error) {
    console.log("Database is not connetcted", error);
  }
};
export default connectDb;

export {connectDb}