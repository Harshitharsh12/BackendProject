import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();
router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerController
);
router.post("/login", loginController);
export default router;
