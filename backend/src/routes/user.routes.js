import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
// register user
router.route("/register-user").post(upload.single("avtar"), registerUser);

export default router;
