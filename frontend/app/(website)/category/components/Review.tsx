 "use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { iReview } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import axios from "axios";
import Link from "next/link";

interface ReviewProps {
  reviews: iReview[];
  lastId: string;
  sendRatingToParent: (rating: number) => void;
}

const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return "0.0"; // Avoid division by zero
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place
};

const Review: React.FC<ReviewProps> = ({
  reviews,
  lastId,
  sendRatingToParent,
}) => {
  const showToast = useNotificationToast(); // Use the custom hook
  const averateRating = calculateAverageRating(reviews);

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = parseFloat(averateRating);
      sendRatingToParent(avg);
    }
  }, [reviews, sendRatingToParent, averateRating]);

  // for rating
  const [isStarred, setIsStarred] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // log add review
  const [ratingNum, setRatingNum] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const user = useAuth();
  const userId = user?.user?._id;

  // add review
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    const reviewData = {
      user: userId,
      product: lastId,
      rating: ratingNum,
      comment,
    };
    try {
      const addReview = await axiosInstence.post(
        "/review/add-review",
        reviewData,
        {
          withCredentials: true,
        }
      );
      showToast(addReview.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        setError(errorMessage);
      } else {
        setError(true);
      }
    } finally {
      setloading(false);
    }
  };

  // for review
  const clickStaredButton = (index: number) => {
    setRatingNum(index + 1);
    const updatedStars = isStarred.map((_, i) => i <= index);
    setIsStarred(updatedStars);
    setRatingNum(index + 1);
  };

  // delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await axiosInstence.delete(
        `/review/delete-review/${reviewId}`,
        {
          data: { userId }, // Send the logged-in user's ID
          withCredentials: true,
        }
      );
      showToast(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        showToast(errorMessage || "Something went wrong!");
      }
    }
  };

  return (
    <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Customer Reviews
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Review Summary
          </h3>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.round(parseFloat(averateRating))
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-3 text-2xl font-medium text-gray-900">
              {averateRating}
            </span>
            <span className="ml-1 text-sm text-gray-500">out of 5</span>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Based on {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </p>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Share your experience
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Let other customers know what you think about this product
            </p>

            <Dialog>
              {user?.user ? (
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors">
                    Write a review
                  </Button>
                </DialogTrigger>
              ) : (
                <Link href="/login" passHref>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors">
                    Write a review
                  </Button>
                </Link>
              )}

              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mb-2">
                    Write Your Review
                  </DialogTitle>
                  <DialogDescription>
                    <div className="mb-4">
                      <div className="flex items-center justify-center mb-4">
                        {isStarred.map((starred, index) => (
                          <Star
                            key={index}
                            className={`h-8 w-8 mx-1 cursor-pointer transition-colors ${
                              starred
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                            onClick={() => clickStaredButton(index)}
                          />
                        ))}
                      </div>
                      <textarea
                      value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        name="comment"
                        placeholder="Share your thoughts about this product..."
                        className="w-full h-32 border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      ></textarea>
                      {error && (
                        <p className="text-red-600 mt-2 text-sm">{error}</p>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleAddReview}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Reviews List Section */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Customer Feedback
          </h3>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews?.map((data, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={data.userDetails?.avtar}
                        alt={data.userDetails?.name || "User"}
                      />
                      <AvatarFallback className="bg-red-100 text-red-800">
                        {data.userDetails?.name
                          ? data.userDetails.name.charAt(0).toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {data.userDetails?.name || "Anonymous"}
                      </p>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${
                              idx < data.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-2 text-base">{data.comment}</p>

                  {data.userDetails?._id === userId && (
                    <div className="mt-3 flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete review
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-medium text-gray-900">
                              Delete Review
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-gray-500">
                              Are you sure you want to delete your review? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-5">
                            <Button
                              variant="outline"
                              className="mr-2"
                              onClick={() => {
                                // Close dialog by finding the close button and clicking it
                                const closeButton = document.querySelector(
                                  "[data-dialog-close]"
                                );
                                if (closeButton instanceof HTMLElement) {
                                  closeButton.click();
                                }
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDeleteReview(data._id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
