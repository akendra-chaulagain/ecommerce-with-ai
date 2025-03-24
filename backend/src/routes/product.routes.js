import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  editProductImage,
  getAllproducts,
  productDetails,
} from "../controllers/product.controllers.js";

// create category route
router.route("/create-product").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
  upload.array("images", 4),
  // create Product
  createProduct
);

// edit product route
router.route("/update-product/:id").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
  upload.array("images", 4),
  // create Product
  editProduct
);

// update product images
router.route("/update-product/:productId/:imagePublicId").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
  upload.single("images"),
  // create Product
  editProductImage
);

// delete product

router.route("/delete-product/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // create Product
  deleteProduct
);
// get all products
router.route("/").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  getAllproducts
);

// productDetails
router.route("/product-details/:id").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // create Product
  productDetails
);

export default router;
