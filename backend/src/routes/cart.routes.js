import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { addToCart, deleteFromcart, getCartAccordingToLoginUser, updateCartItems } from "../controllers/cart.controllers.js";

// add to cart  route
router.route("/add-to-cart").post(
  // verify token
  verifyJwt,
  // access control
  authorize("User", "Admin"),
  addToCart
);

// delete from cart
router.route("/delete-item-from-cart/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("User", "Admin"),
  deleteFromcart
);
// update cart items
router.route("/update-item-from-cart").put(
  // verify token
  verifyJwt,
  // access control
  authorize("User", "Admin"),
  updateCartItems
);

// get cart
router.route("/").get(
  // verify token
  verifyJwt,
  // access control
  authorize("User", "Admin"),
  getCartAccordingToLoginUser
);


export default router;
