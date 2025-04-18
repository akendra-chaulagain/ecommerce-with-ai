"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  EyeIcon,
  Trash2Icon,
  Search,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dashboard/dialog";
import { axiosInstence } from "@/hooks/axiosInstence";

import LoadingPage from "@/components/webiste/Loading";
import { useNotificationToast } from "@/hooks/toast";
import { useOrder } from "@/context/admin/OrderContext";
import { iReview, iReviewResponse } from "@/types/types";
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ProductListingPage = () => {
  const showToast = useNotificationToast();

  //   get order list
  const { getOrderLoading } = useOrder();
  const [review, setReview] = useState<iReview[] | null>(null);

  //   get review
  const fetchReview = async () => {
    try {
      const response = await axiosInstence.get<iReviewResponse>("/review", {
        withCredentials: true,
      });
      setReview(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Define the fetchReview function inside the useEffect

    fetchReview();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await axiosInstence.delete(
        `/review/delete-review/${reviewId}`,
        {
          withCredentials: true,
        }
      );
      showToast(response.data.message);
      fetchReview();
    } catch (error: unknown) {
      console.log(error);
      showToast("Something went wrong, try again");
    }
  };

  return (
    <>
      {getOrderLoading ? (
        <LoadingPage />
      ) : (
        <div className="w-full mx-auto rounded-xl border shadow-sm bg-white">
          {/* Header Section */}

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b bg-gray-50">
            {/* Category Filter */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Review Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your Review inventory
              </p>
            </div>

            {/* Search */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-9 pr-4 py-2 w-full border rounded-md text-sm  outline-none"
                />
              </div>
              <Button
                variant="outline"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:text-white focus:outline-none "
              >
                Search
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Order Id</div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-1">
                      Product Id
                    </div>
                  </th>

                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Review Date
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* {
                order?.map((data, index: number) => ( */}
                {review && review.length > 0 ? (
                  review.map((data, index: number) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-800">
                              {data?._id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {data?.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {data?.product}{" "}
                      </td>

                      <td className="px-4 py-3 text-right font-medium">
                        {/* {data?.createdAt}{" "} */}
                        {formatDate(data?.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/review/review-detail/${data._id}`}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                          </Link>

                          <ConfirmDialog
                            trigger={
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-600"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            }
                            title="Delete Product"
                            description="Are you sure you want to delete this product? This action cannot be undone."
                            confirmText="Delete"
                            cancelText="Cancel"
                            onConfirm={() => {
                              handleDeleteReview(data._id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <span className="  text-[20px] font-semibold p-10">
                    No Review available.
                  </span>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-white border-t flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl">
            <span className="text-sm text-gray-600">
              Showing <span className="font-medium">5</span> of{" "}
              <span className="font-medium">24</span> products
            </span>
            <div className="flex">
              <div className="flex border divide-x rounded-md overflow-hidden">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </button>
                <button className="px-3 py-1 bg-red-600 text-white font-medium">
                  1
                </button>
                <button className="px-3 py-1 hover:bg-gray-100">2</button>
                <button className="px-3 py-1 hover:bg-gray-100">3</button>
                <button className="px-3 py-1 hover:bg-red-50 text-red-600 flex items-center gap-1">
                  Next
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State - would show conditionally if needed */}
          {false && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No review found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                There are no review for this product.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductListingPage;
