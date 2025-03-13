import { Router } from "express";

const router = Router();
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import {
  createReview,
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

export default router;
