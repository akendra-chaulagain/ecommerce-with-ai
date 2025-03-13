import { Router } from "express";
const router = Router();
import {
  categoryDetails,
  creatCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
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

// get all category route
router.route("/").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),

  // get all category
  getAllCategories
);

// category details route
router.route("/category_details/:id").get(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  // get  individual category details
  categoryDetails
);
// category delete route
router.route("/delete_category/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin"),
  // get  individual category details
  deleteCategory
);

// delete category route

export default router;
