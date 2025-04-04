
import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/orders.controllers.js";
import { User } from "../models/user.models.js";

// create category route
router.route("/create-order").post(
  // verify token
  verifyJwt,
//   // access control
  authorize("User","Admin"),
//   // upload image

  // create Product
  createOrder
);

// edit product route

router.route("/update-product/:id").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
  
  // create Product
//   editProduct
);

// update product images
router.route("/update-product/:productId/:imagePublicId").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
 
  // create Product
//   editProductImage
);

// delete product

router.route("/delete-product/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // create Product
//   deleteProduct
);
// get all products
router.route("/").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
//   getAllproducts
);

// productDetails
router.route("/product-details/:id").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
//   productDetails
);

export default router;
