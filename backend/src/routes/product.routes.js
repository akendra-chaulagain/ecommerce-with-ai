import { Router } from "express";
const router = Router();

import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createProduct } from "../controllers/product.controllers.js";

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

export default router;
