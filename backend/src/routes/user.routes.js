import { Router } from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controllers.js";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
// register user
router.route("/register-user").post(upload.single("avtar"), registerUser);
// login user
router.route("/login-user").post(loginUser);

// logout routes
router.route("/logout-user").post(verifyJwt, logOutUser);

export default router;
