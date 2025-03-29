import { Router } from "express";

const router = Router();
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import {
  createReview,
  deleteReview,
  editReview,
  getAllReviewAccordingToProduct,
} from "../controllers/review.controllers.js";

// register user
router.route("/add-review").post(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  createReview
);

router
  .route("/review_according-to-product/:id")

  .get(getAllReviewAccordingToProduct);

// edit route
router.route("/edit-review/:id").patch(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  editReview
);

// delete review
router.route("/delete-review/:id").delete(
  // verify token
  verifyJwt,
  // access control
  authorize("Admin", "User"),
  deleteReview
);

export default router;
