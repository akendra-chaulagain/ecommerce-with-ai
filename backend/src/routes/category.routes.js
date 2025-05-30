import { Router } from "express";
const router = Router();
import {
  categoryDetails,
  categoryTree,
  creatCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getFiveDataForHomeScreen,
  getProductsAcoordingToCategory,
  getSubCategories,
} from "../controllers/category.controllers.js";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

// create category route
router.route("/create-category").post(
  // // verify token
  verifyJwt,
  // // access control
  authorize("Admin"),
  // upload image
  upload.single("categoryImage"),
  // create category
  creatCategory
);

// edit category route
router.route("/edit-category/:id").put(
  // verify token
  verifyJwt,
  // // access control
  authorize("Admin"),
  // update image
  upload.single("categoryImage"),

  // edit category
  editCategory
);

// get all category route
router.route("/").get(getAllCategories);

// get sub category route
router.route("/sub-category/:id").get(getSubCategories);

// get category tree route
router.route("/tree").get(categoryTree);

// get 5 category route
router.route("/home-category").get(
  // get all category
  getFiveDataForHomeScreen
);

// category details route
router.route("/category_details/:id").get(
  // get  individual category details
  categoryDetails
);
// category delete route
router.route("/delete_category/:id").delete(
  // // verify token
  verifyJwt,
  // // access control
  authorize("Admin"),
  deleteCategory
);

// get products according to ths categoryId
router.route("/:id").get(getProductsAcoordingToCategory);

export default router;
