import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = new express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);
export default app;
