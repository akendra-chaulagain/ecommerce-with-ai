import mongoose from "mongoose";
import { Review } from "../models/review.models.js";
import { sendreviewEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";

// create review
const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    if (!rating || !comment === undefined) {
      return res
        .status(401)
        .json({ message: false, message: "Enter all the fields" });
    }
    const userData = await User.findById(user);
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
      message: "Review added & email sent successfully",
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
    const allproducts = await Review.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(id) },
      },
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
                // Optionally include only the fields you want
                name: 1,
                price: 1,
                description: 1,
                images: 1,
                // add other product fields as necessary
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
          details: { $arrayElemAt: ["$details", 0] }, // Get the first product details if available
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
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted", deletedReview });
  } catch (error) {
    return res.status(401).json({
      message: "server error while deleting review",
      message: error.message,
    });
  }
};

export {
  createReview,
  getAllReviewAccordingToProduct,
  editReview,
  deleteReview,
};
