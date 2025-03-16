import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { shippingdetails } from "../controllers/shipping.controllers.js";

// create category route
router.route("/add-shipping-details").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),

  // create Product
  shippingdetails
);

export default router;
