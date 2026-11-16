import asyncHandler from "../utils/asyncHandler.js";
import { userModel } from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const registerController = asyncHandler(async (req, res) => {
  const { email, password, userName, fullName } = req.body;
  if (
    [email, password, userName, fullName].some((field) => field?.trim() === "")
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "No Field should be empty!!"));
  }
  const user = await userModel.findOne({ $or: [{ email }, { userName }] });
  if (user) {
    return res.status(409).json(new ApiError(409, "Already Registered!!"));
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log("In controller:" + avatarLocalPath);
  if (!avatarLocalPath) {
    return res
      .status(400)
      .json(new ApiError(400, "Avatar file can't be empty!!"));
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    return res
      .status(400)
      .json(new ApiError(400, "Avatar file can't be empty!!"));
  }
  const newUser = await new userModel({
    email,
    password,
    userName: userName.toLowerCase(),
    fullName,
    avatar,
    coverImage: coverImage || "",
  }).save();
  const userData = await userModel
    .findById(newUser._id)
    .select("-password -refreshToken");
  if (!userData) {
    return res.status(402).json(new ApiError(402, "Error in user Creation"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userData, "New User Registered Successfully!!"));
});
const loginController = async (req, res) => {
  try {
  } catch (err) {}
};
export { loginController, registerController };
