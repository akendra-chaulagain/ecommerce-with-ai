import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
const router = Router();

// register user
router.route("/register-user").post(registerUser);

export default router;
