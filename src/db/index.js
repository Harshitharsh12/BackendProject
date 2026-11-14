import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
    console.log(
      `Mongodb Database ${con.connection.host} Connected Successfully!!`
    );
  } catch (error) {
    console.log(`Database Connection Error:`, error);
    process.exit(1);
  }
};
export default connectDB;
