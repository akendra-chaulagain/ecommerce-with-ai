// pages/order.js
"use client";
import { useEffect, useState } from "react";
import P1 from "@/public/images/product/p3.jpg";
import Image from "next/image";

import { axiosInstence } from "@/hooks/axiosInstence";
import LoadingPage from "@/components/Loading";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // e.g., "Apr"
    day: "numeric",
  });
};

function Page() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderData = async () => {
    try {
      const resposne = await axiosInstence.get("/order/get-user-order", {
        withCredentials: true,
      });
      setOrder(resposne.data.orders[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);
  // console.log(order[0]?.products?.details);

  // Usage

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-red-600 mb-8">Your Order</h2>

            <div className="flex flex-col ">
              {/* Order Summary */}

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 bg-red-600 text-white font-medium">
                  Order Summary
                </div>
                <div className="p-6">
                  {order.length === 0 ? (
                    <p className="text-gray-500">Your order list is empty</p>
                  ) : (
                    <>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Product</th>
                            <th className="text-center py-2">Quantity</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Status</th>
                            <th className="text-right py-2">
                              Estimated delivery date
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.products?.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="py-4 flex items-center space-x-4">
                                {/* Image Wrapper */}
                                <div className="w-24 h-24 flex-shrink-0">
                                  <Image
                                    src={P1}
                                    alt={item.name}
                                    width={80}
                                    height={50}
                                    className="object-cover cursor-pointer rounded-md"
                                  />
                                </div>

                                {/* Item Name */}
                                <div className="font-medium text-gray-800">
                                  {item.name.slice(0, 30)}
                                </div>
                              </td>

                              <td className="py-4">
                                <div className="flex items-center justify-center">
                                  <span className="px-4">{item.quantity}</span>
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="py-4 text-right">
                                {order.orderStatus}
                              </td>
                              <td className="py-4 text-right">
                                {formatDate(order.deliveryDate)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Details */}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Page;
