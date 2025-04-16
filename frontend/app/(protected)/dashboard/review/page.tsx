"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  EyeIcon,
  Trash2Icon,
  PlusIcon,
  PencilIcon,
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
  const { getOrderLoading, order } = useOrder();
  const [review, setReview] = useState([]);

  const [loading, setLoading] = useState(false);

  // delete product
  const handledelete = async (productId: string) => {
    setLoading(true);
    try {
      await axiosInstence.delete(`/product/delete-product/${productId}`, {
        withCredentials: true,
      });
      showToast("Product deleted successfully");
      //   getProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  //   get review

  useEffect(() => {
    // Define the fetchReview function inside the useEffect
    const fetchReview = async () => {
      try {
        const response = await axiosInstence.get("/review", {
          withCredentials: true,
        });
        setReview(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, []);
  console.log(review);

  return (
    <>
      {getOrderLoading || loading ? (
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
                Manage your product inventory
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
                    Payment Method
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-1">
                      Amount
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Id
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
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
                              {data?.orderId}
                            </p>
                            <p className="text-[10px] text-red-600 font-bold">
                              payment status: {data?.paymentStatus}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {data?.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        $ {data?.totalPrice}{" "}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {data?.transactionId}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {/* {data?.createdAt}{" "} */}
                        {formatDate(data?.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/order/order-detail/${data._id}`}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/category/product/editProduct/${data._id}`}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-amber-600"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </Link>
                          <ConfirmDialog
                            trigger={
                              <Button
                                // onClick={handledelete(data._id)}
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
                              handledelete(data._id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>No orders available.</div>
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
                No products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                You havent added any products yet or your search filters didnt
                match any products.
              </p>
              <Link href="/dashboard/products/add-product">
                <Button className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductListingPage;
