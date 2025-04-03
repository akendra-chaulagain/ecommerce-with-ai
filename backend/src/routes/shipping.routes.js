import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import {
  deleteShippingAddress,
  editShippingAddress,
  getShippingDetails,
  shippingdetails,
} from "../controllers/shipping.controllers.js";

// create category route
router.route("/add-shipping-details").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  shippingdetails
);
router.route("/update-shipping-details/:id").put(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  editShippingAddress
);

// DELETE ADDRESS
router.route("/delete-shipping-details/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  deleteShippingAddress
);

// get shipping details
router.route("/").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  getShippingDetails
);

export default router;
