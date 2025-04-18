"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, MessageSquare, Calendar, User } from "lucide-react";
import { useParams } from "next/navigation";
import { axiosInstence } from "@/hooks/axiosInstence";
import LoadingPage from "@/components/webiste/Loading";

// Product Review Data Types

// User Details Interface
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
  avtar: string;
}

// Product Details Interface
interface ProductDetails {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  sku: number;
  color: string[];
  size: string[];
  isActive: boolean;
  categoryId: string;
  images: string[];

  brand: string;
  gender: string;
  material: string;
  specifications: string;
}

// Review Interface
interface Review {
  review: {
    _id: string;
    user: string;
    product: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  rating: number;
  createdAt: string;
  productDetails: ProductDetails;
  userDetails: UserDetails;
  comment: string;
}

const ProductReviews = () => {
  // This is just for display - no actual functionality
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  //   get user by id
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  console.log(id);

  const getReviewById = useCallback(async () => {
    setloading(true);
    try {
      const res = await axiosInstence.get(`/review/${id}`, {
        withCredentials: true,
      });
      setReviewData(res.data.review);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }, [id]);
  useEffect(() => {
    getReviewById();
  }, [getReviewById]);

  console.log(reviewData);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-1xl mx-auto px-4">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-red-600 mb-8">
                Product Reviews
              </h1>
              <span>
                <Link
                  href="/dashboard/review"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </Link>
              </span>
            </div>

            {/* Review Statistics Summary */}
            <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
              <div className="bg-red-600 text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Review Summary</h2>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      4.0 Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className=" gap-6">
                  {/* Right side - Product info summary */}
                  <div className="md:w-/3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 bg-gray-200 rounded">
                          <Image
                            src={reviewData?.productDetails?.images[0] || ""}
                            alt="Product"
                            width={80}
                            height={80}
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">
                            {reviewData?.productDetails?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            SKU: {reviewData?.productDetails?.sku} | Price: $
                            {reviewData?.productDetails?.price}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">Color:</span>
                          <span className="ml-2 font-medium">
                            {reviewData?.productDetails?.color.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <span className="ml-2 font-medium">
                            {reviewData?.productDetails?.size.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Material:</span>
                          <span className="ml-2 font-medium">
                            {reviewData?.productDetails?.material}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Gender:</span>
                          <span className="ml-2 font-medium capitalize">
                            {reviewData?.productDetails?.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Cards */}
            <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
              <div className="bg-red-600 text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">All Reviews (1)</h2>
                  <div className="flex items-center space-x-2">
                    <button className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> Most Recent
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/*  Review Item map */}
                {}

                <div className="border-b pb-6 mb-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                      <Image
                        src={reviewData?.userDetails?.avtar || ""}
                        alt="User"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-medium">
                          {reviewData?.userDetails?.name}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {reviewData?.userDetails?.role}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <div className="flex mr-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (reviewData?.rating ?? 0)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center mr-4">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(reviewData?.createdAt || " ")}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Verified Purchase
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-16 mt-4 flex items-center gap-4">
                    <span>{reviewData?.comment}</span>
                  </div>
                </div>

                {/* You would map through your review data here for multiple reviews */}

                {/* Review Pagination */}
                {/* <div className="flex justify-center mt-6">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-white border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-50"
                      disabled
                    >
                      Previous
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-red-600">
                      1
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                      2
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                      3
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div> */}
              </div>
            </div>

            {/* Filter Controls */}
            {/* <div className="fixed bottom-6 right-6">
                <button className="flex items-center gap-2 bg-red-600 text-white rounded-full px-4 py-3 shadow-lg hover:bg-red-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    ></path>
                  </svg>
                  Filter Reviews
                </button>
              </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
