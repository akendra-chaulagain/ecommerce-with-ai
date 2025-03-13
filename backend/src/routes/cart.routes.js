import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { addToCart } from "../controllers/cart.controllers.js";

// add to cart  route
router.route("/add-to-cart").post(
  // verify token
  verifyJwt,
  // access control
  authorize("User","Admin"),
  addToCart
);

export default router;
