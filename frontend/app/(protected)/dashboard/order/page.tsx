"use client";
import React, {  useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import LoadingPage from "@/components/webiste/Loading";

import { axiosInstence } from "@/hooks/axiosInstence";
interface iProductDetails {
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
  createdAt: string;
  brand: string;
  gender: string;
  material: string;
  specifications: string;
  quantity: number;
}

interface iOrder {
  _id: string;
  userId: string;
  orderId: string;
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  transactionId: string;
  taxAmount: number;
  deliveryDate: string;
  createdAt: string;
  productDetails: iProductDetails[];
  userDetails: {
    _id: string;
    name: string;
    email: string;
    contact: string;
    createdAt: string;
  };
  shippinDetails: {
    _id: string;
    userId: string;
    name: string;
    contact: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdAt: string;
  };
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Page = () => {
  //   get order list
  const [order, setOrder] = useState<iOrder[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;
  const [getOrderLoading, setOrderLoading] = useState<boolean>(false);

  const getOrderData = async (page: number) => {
    setOrderLoading(true);
    try {
      const response = await axiosInstence.get(
        `/order?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      setOrder(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    getOrderData(currentPage);
  }, [currentPage]);
  // Handle page change

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  

  return (
    <>
      {getOrderLoading ? (
        <LoadingPage />
      ) : (
        <div className="w-full mx-auto rounded-xl border shadow-sm bg-white">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Order Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your product inventory
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-9 pr-4 py-2 w-full border rounded-md text-sm outline-none"
                />
              </div>
              <Button
                variant="outline"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:text-white focus:outline-none"
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
                {order && order.length > 0 ? (
                  order.map((data, index: number) => (
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
                        $ {data?.totalPrice}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {data?.transactionId}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
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
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <span className="text-[20px] font-semibold p-10">
                    No orders available.
                  </span>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-4 mt-6 py-6 px-10">
            {/* First Page Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              First
            </button>

            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              Previous
            </button>

            {/* Page Information */}
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              Next
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
