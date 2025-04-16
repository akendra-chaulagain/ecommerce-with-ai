"use client";
import LoadingPage from "@/components/webiste/Loading";
import { useOrder } from "@/context/admin/OrderContext";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function OrdersPage() {
  // This would normally come from props or an API call

  const { id } = useParams();

  const { getOrderById, OrderDetails, loadingOrder } = useOrder();
  useEffect(() => {
    if (typeof id === "string") {
      getOrderById(id);
    }
  }, [getOrderById, id]);

  // console.log(OrderDetails?.order?.productDetails);

  ;
  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {loadingOrder ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-1xl mx-auto px-4  ">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-red-600 mb-8">
                Order Dashboard
              </h1>
              <span>
                {" "}
                <Link
                  href="/dashboard/order"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </Link>
              </span>
            </div>

            <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
              {/* Order Header */}
              <div className="bg-red-600 text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Order #{OrderDetails?.order.orderId}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      {OrderDetails?.order.orderStatus}
                    </span>
                    <span className="text-sm">
                      {formatDate(OrderDetails?.order?.createdAt || " ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Order Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-gray-600">Transaction ID:</div>
                        <div className="font-medium">
                          {OrderDetails?.order.transactionId}
                        </div>

                        <div className="text-gray-600">Total Price:</div>
                        <div className="font-medium">
                          ${OrderDetails?.order?.totalPrice}
                        </div>

                        <div className="text-gray-600">Payment Status:</div>
                        <div className="font-medium">
                          {OrderDetails?.order.paymentStatus}
                        </div>

                        <div className="text-gray-600">Tax Amount:</div>
                        <div className="font-medium">
                          ${OrderDetails?.order.taxAmount}
                        </div>

                        <div className="text-gray-600">Delivery Date:</div>
                        <div className="font-medium">
                          {formatDate(OrderDetails?.order.deliveryDate || " ")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      User Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-gray-600">Name:</div>
                        <div className="font-medium">
                          {OrderDetails?.order.userDetails.name}
                        </div>

                        <div className="text-gray-600">Email:</div>
                        <div className="font-medium">
                          {OrderDetails?.order.userDetails.email}
                        </div>

                        <div className="text-gray-600">Contact:</div>
                        <div className="font-medium">
                          {OrderDetails?.order.userDetails.contact}
                        </div>

                        <div className="text-gray-600">Member Since:</div>
                        <div className="font-medium">
                          {formatDate(
                            OrderDetails?.order.userDetails.createdAt || " "
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Shipping Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <span className="text-gray-600">Recipient: </span>
                        <span className="font-medium">
                          {OrderDetails?.order.shippinDetails.name}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-600">Contact: </span>
                        <span className="font-medium">
                          {OrderDetails?.order.shippinDetails.contact}
                        </span>
                      </div>

                      <div className="md:col-span-2">
                        <span className="text-gray-600">Address: </span>
                        <span className="font-medium">
                          {OrderDetails?.order.shippinDetails.street},{" "}
                          {OrderDetails?.order.shippinDetails.city},{" "}
                          {OrderDetails?.order.shippinDetails.state}{" "}
                          {OrderDetails?.order.shippinDetails.zip},{" "}
                          {OrderDetails?.order.shippinDetails.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product Details Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Product Details
                  </h2>
                 
                   { OrderDetails?.order?.productDetails?.map((data, index:number) => (
                      <div className="border-b pb-4" key={index}>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded">
                            <Image
                              src={data?.images[0]}
                              alt="logo"
                              width={100}
                              height={100}
                              className=" flex justify-center object-fill cursor-pointer "
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">
                              {data.name.slice(0, 25)}...
                            </h3>
                            <p className="text-sm text-gray-600">
                              Size: {data.size} | Color: {data.color}
                            </p>
                           
                          </div>
                          <div className="font-medium">${data.price}</div>
                        </div>
                      </div>
                    ))}
                 
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                    Print Receipt
                  </button>
                  {/* <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Track Delivery
                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
