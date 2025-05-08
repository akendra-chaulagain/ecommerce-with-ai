// pages/order.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { axiosInstence } from "@/hooks/axiosInstence";
import LoadingPage from "@/components/webiste/Loading";
import { iOrder, iProductDetails } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function Page() {
  const [order, setOrder] = useState<iOrder[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  const getOrderData = async () => {
    try {
      const resposne = await axiosInstence.get("/order/get-user-order", {
        withCredentials: true,
      });
      setOrder(resposne.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("No user, redirecting to login...");
      router.push("/login");
    } else {
      getOrderData();
    }
  }, [user, router, loading]);

  return (
    <>
      {loadingOrder ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Order History
              </h1>
              <span className="text-sm text-gray-500">
                {order?.length} {order?.length === 1 ? "order" : "orders"} found
              </span>
            </div>

            {order?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-16 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Your order history is currently empty.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {order?.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium text-sm">
                          Order #{index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {order.products.map((product: iProductDetails) => (
                        <div
                          key={product.productId}
                          className="p-6 flex items-start"
                        >
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden relative">
                              <Image
                                src={product?.images?.[0] || "/placeholder.jpg"}
                                alt={product?.name || "Product Image"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100px, 200px"
                              />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {product?.name}
                              </h3>
                              <p className="text-lg font-medium text-gray-900">
                                ${product?.price?.toFixed(2)}
                              </p>
                            </div>

                            <div className="mt-1 text-sm text-gray-500">
                              {product?.description && (
                                <p className="line-clamp-2">
                                  {product.description}
                                </p>
                              )}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                  Qty: {product.quantity}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium text-gray-700">
                                  Delivery by:{" "}
                                  <span className="text-gray-900">
                                    {formatDate(order?.deliveryDate)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            Get Invoice
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Order Total</p>
                          <p className="text-xl font-semibold text-gray-900">
                            ${order.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default Page;
