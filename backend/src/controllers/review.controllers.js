import mongoose from "mongoose";
import { Review } from "../models/review.models.js";

// create review
const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    if (!rating || !comment === undefined) {
      return res
        .status(401)
        .json({ message: false, message: "Enter all the fields" });
    }

    const addReview = await Review.create({
      user,
      product,
      rating,
      comment,
    });
    return res
      .status(200)
      .json({ message: true, message: "Review added", data: addReview });
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
        $match: { product: new mongoose.Types.ObjectId(id) }, // Match reviews based on product ID
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
        $unwind: "$userDetails",
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
    ]);
    return res.status(200).json({
      message: "Product review",

      data: allproducts,
    });
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
