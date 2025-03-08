import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
// register user
router.route("/register-user").post(upload.single("avtar"), registerUser);
// login user
router.route("/login-user").post(loginUser);


export default router;
