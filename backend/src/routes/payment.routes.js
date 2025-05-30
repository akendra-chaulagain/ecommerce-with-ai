// create paypal order
import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";

import {
  capturePaypalOrder,
  createPaypalOrder,
} from "../controllers/payment.controllers.js";

router.route("/create-payment").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create paypalorder
  createPaypalOrder
);

router.route("/capture-payment").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create paypalorder
  capturePaypalOrder
);

export default router;


