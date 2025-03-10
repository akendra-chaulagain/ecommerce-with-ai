import { Router } from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  logOutUser,
  registerUser,
  updateAvtar,
  updatePassword,
  updateUser,
} from "../controllers/user.controllers.js";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { attemptLimit } from "../middleware/rateLimit.middleware.js";
import multer from "multer";
// register user
router.route("/register-user").post(upload.single("avtar"), registerUser);
// secure routes
router.route("/login-user").post(attemptLimit, loginUser); // login routes
router.route("/logout-user").post(verifyJwt, logOutUser); // logout routes
router.route("/reset-password").post(attemptLimit, verifyJwt, updatePassword); // reset or update password routes
// router.route("/update-user").post(verifyJwt, updateUser); // reset or update password routes
router.route("/update-user").post(verifyJwt, updateUser); // reset or update user routes
router
  .route("/update-avtar")
  .patch(verifyJwt, upload.single("avtar"), updateAvtar); // reset or update password routes
router.route("/user-details/:id").get(verifyJwt, getUser);
router.route("/delete-user/:id").delete(verifyJwt, deleteUser);

//  authorize("admin");
// router.route("/update-user").post(verifyJwt, authorize("Admin"), updateUser); // reset or update user routes

export default router;
