import { Router } from "express";
const router = Router();
import {
  creatCategory,
  editCategory,
} from "../controllers/category.controllers.js";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

// create category route
router.route("/create-category").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // upload image
  upload.single("categoryImage"),
  // create category
  creatCategory
);

// edit category route
router.route("/edit-category/:id").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // update image
  upload.single("categoryImage"),
  // edit category
  editCategory
);

export default router;
