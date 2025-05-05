// pages/order.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { axiosInstence } from "@/hooks/axiosInstence";
import LoadingPage from "@/components/webiste/Loading";
import { iOrder, iProductDetails } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function Page() {
  const [order, setOrder] = useState<iOrder[]>([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();

  const getOrderData = async () => {
    try {
      const resposne = await axiosInstence.get("/order/get-user-order", {
        withCredentials: true,
      });
      setOrder(resposne.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
    if (user) {
      getOrderData();
    }
  }, [user]);

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
                <div className="p-6">
                  {order?.length === 0 ? (
                    <p className="text-gray-500">Your order list is empty</p>
                  ) : (
                    <>
                      <table className="w-full">
                        <div>
                          {order?.map((order, index) => (
                            <div
                              key={order._id || index}
                              className="mb-6 border rounded-lg shadow bg-white"
                            >
                              <div className="bg-red-600 text-white p-4 font-semibold">
                                Order #{index + 1}
                              </div>

                              <div className="p-4 space-y-4">
                                {order.products.map(
                                  (product: iProductDetails) => (
                                    <div
                                      key={product.productId}
                                      className="flex items-center border-b pb-4"
                                    >
                                      {/* Product Image */}
                                      <div className="w-20 h-20 flex-shrink-0 mr-4">
                                        <Image
                                          src={
                                            product?.images?.[0] ||
                                            "/placeholder.jpg"
                                          }
                                          alt={product?.name || "Product Image"}
                                          width={80}
                                          height={80}
                                          className="rounded object-cover"
                                        />
                                      </div>

                                      {/* Product Info */}
                                      <div className="flex-1">
                                        <h4 className="text-lg font-medium">
                                          {product?.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                          Qty: {product.quantity}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          Price: ${product?.price?.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-600 font-semibold">
                                          Estimated Delivery:{" "}
                                          {formatDate(order?.deliveryDate)}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}

                                {/* Order Summary */}
                                <div className="text-right text-sm text-gray-700 mt-4">
                                  Status:{" "}
                                  <span className="font-medium">
                                    {order.orderStatus}
                                  </span>{" "}
                                  | Total:{" "}
                                  <span className="font-semibold">
                                    ${order.totalPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
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
