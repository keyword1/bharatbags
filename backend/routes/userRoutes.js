import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  updateOtp,
  updateVerified,
  createAddress,
  updateAddress,
  updatePhoneNumber,
  googleLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/updateotp", updateOtp);
userRouter.post("/updateverified", updateVerified);
userRouter.post("/createaddress", createAddress);
userRouter.post("/updateaddress", updateAddress);
userRouter.post("/updatephonenumber", updatePhoneNumber);
userRouter.post("/googlelogin", googleLogin);

export default userRouter;
