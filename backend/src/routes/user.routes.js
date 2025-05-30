import { Router } from "express";
import {
  deleteUser,
  getLoginUser,
  getUser,
  loginUser,
  logOutUser,
  registerUser,
  resentOtpAgain,
  updateAvtar,
  updatePassword,
  updateUser,
  verifyUserOtp,
} from "../controllers/user.controllers.js";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import {
  verifyJwt,
  verifyTemporaryToken,
} from "../middleware/auth.middleware.js";
import { attemptLimit } from "../middleware/rateLimit.middleware.js";

// register user
router.route("/register-user").post(upload.single("avtar"), registerUser);
// secure routes
router.route("/login-user").post(attemptLimit, loginUser); // login routes
// get login user
router.route("/login-user/profile").get(verifyJwt, getLoginUser); // login routes

router.route("/logout-user").post(verifyJwt, logOutUser); // logout routes
router.route("/reset-password").put(verifyJwt, updatePassword); // reset or update password routes
// router.route("/update-user").post(verifyJwt, updateUser); // reset or update password routes
router.route("/update-user").put(verifyJwt, updateUser); // reset or update user routes
router
  .route("/update-avtar")
  .put(verifyJwt, upload.single("avtar"), updateAvtar); // reset or update password routes
router.route("/user-details/:id").get(verifyJwt, getUser);
router.route("/delete-user/:id").delete(verifyJwt, deleteUser);
router.route("/login/verify-user").post(verifyUserOtp); // verify otp
router.route("/login/resent-otp").post(resentOtpAgain); // resent otp
// resentOtpAgain;



export default router;
