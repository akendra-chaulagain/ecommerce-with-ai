import mongoose from "mongoose";
import { Review } from "../models/review.models.js";
import { sendreviewEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
const { ObjectId } = mongoose.Types;

// create review
const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    if (!rating || !comment) {
      return res
        .status(401)
        .json({ message: false, message: "Enter all the fields" });
    }
    // find it the user already review the product or not
    const userData = await User.findById(user);
    const productId = await Product.findById(product);
    const findUserInreview = await Review.find({
      user: userData._id,
      product: productId,
    });

    if (findUserInreview.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product." });
    }

    const addReview = await Review.create({
      user,
      product,
      rating,
      comment,
    });

    // Send email notification
    const emailSubject = "Thank You for Your Review!";
    const emailText = `Hi ${userData.name},\n\nThank you for reviewing review. Your feedback helps us improve!\n\nReview: ${comment}\nRating: ${rating}/5\n\nBest regards,\nYour E-Commerce Team`;

    await sendreviewEmail(userData.email, emailSubject, emailText);

    return res.status(201).json({
      message: "Review added",
      data: addReview,
    });
  } catch (error) {
    return res.status(401).json({
      message: false,
      message: "something went wrong!",
      message: error.message,
    });
  }
};

const getAllReviewAccordingToProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const  {userId} = req.query;
 const userObjectId = new mongoose.Types.ObjectId(userId);
    

    const allproducts = await Review.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(id) },
      },

      // {
      //   $match: { product: new ObjectId("67e80ecdf580ce7c0e5367aa") }, // Match the product ID
      // },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          "userDetails.password": 0,
          "userDetails.refreshToken": 0,
          "userDetails.role": 0,
          "userDetails.email": 0,
          "userDetails.contact": 0,
        },
      },

      {
        $addFields: {
          isCurrentUser: {
            $cond: {
              if: { $eq: ["$user",userObjectId] }, // Compare review's user ID with the logged-in user ID
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $sort: { isCurrentUser: -1, createdAt: -1 }, // Sort by isCurrentUser to place the current user's review at the top, and then by creation date if needed
      },
      {
        $group: {
          _id: "$product", // Group by product ID
          reviews: { $push: "$$ROOT" }, // Store all reviews in an array
        },
      },
      {
        $lookup: {
          from: "products",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$productId"] },
              },
            },
            {
              $project: {
                name: 1,
                price: 1,
                description: 1,
                images: 1,
              },
            },
          ],
          as: "details",
        },
      },
      {
        $project: {
          _id: 1,
          reviews: 1,
          details: { $arrayElemAt: ["$details", 0] },
        },
      },
    ]);

    return res.status(200).json(allproducts[0]);
  } catch (error) {
    return res.status(401).json({
      message: "server error ",
      message: error.message,
    });
  }
};
// edit review
const editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        rating,
        comment,
      },
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res
      .status(201)
      .json({ message: "Updated Successfully", date: updatedReview });
  } catch (error) {
    return res.status(401).json({
      message: "server error ",
      message: error.message,
    });
  }
};

// delete review
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const { userId } = req.body; // The logged-in user's ID

    // Find the review by its ID
    const review = await Review.findById(reviewId);

    // Check if the review exists and if the logged-in user is the author
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "You cannot delete this review" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export {
  createReview,
  getAllReviewAccordingToProduct,
  editReview,
  deleteReview,
};
