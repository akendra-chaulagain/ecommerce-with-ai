import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  deleteImgae,
  deleteProduct,
  editProduct,
  getAllproducts,
  getAllUniqueAttributes,
  getNineProductForHomePage,
  getProductsByCategoryAndFilters,
  productDetails,
} from "../controllers/product.controllers.js";

// create category route
router.route("/create-product").post(
  // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin"),
  // upload image
  upload.array("images", 5),
  // create Product
  createProduct
);

// edit product route
router.route("/update-product/:id").put(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin"),
  // upload image
  upload.array("images", 5),
  // create Product
  editProduct
);

// delete product

router.route("/delete-product/:id").delete(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin"),
  // create Product
  deleteProduct
);
// get all products
router.route("/").get(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("Admin", "User"),
  // create Product
  getAllproducts
);

// productDetails
router.route("/product-details/:id").get(
  // verify token

  // create Product
  productDetails
);

// delete image

router.route("/delete-image/:id").delete(deleteImgae);

router.route("/get-filter").get(getAllUniqueAttributes);

router.route("/filter").get(getProductsByCategoryAndFilters);

// get data for home page
router.route("/home-product").get(getNineProductForHomePage);

export default router;
