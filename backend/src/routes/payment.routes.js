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


// {
//   address_line_1: '61 Rochman Boulevard',
//   admin_area_2: 'Scarbrough',
//   admin_area_1: 'ON',
//   postal_code: 'M1h 1S1',
//   country_code: 'CA'
// }