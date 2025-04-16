import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getUserAllOrders,
} from "../controllers/orders.controllers.js";

// create category route
router.route("/create-order").post(
  // verify token
  verifyJwt,
  //   // access control
  authorize("User", "Admin"),
  //   // upload image

  // create Product
  createOrder
);

// get all orders
router.route("/").get(
  // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin", "User")
  // create Product
  getAllOrders
);

// productDetails
router.route("/order-details/:id").get(
  // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin", "User")

  getOrderDetails
);

router.route("/get-user-order").get(
  // verify token
  verifyJwt,
  // // access control
  authorize("Admin", "User"),
  // create Product
  getUserAllOrders
);

export default router;
