import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
const app = new express();
const PORT = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at port ${PORT} Successfully!!`);
    });
  })
  .catch((err) => console.log(`Database Connection failed!!`,err));
