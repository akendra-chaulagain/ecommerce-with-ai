"use client";

import { Button } from "@/components/ui/button";
import LoadingPage from "@/components/webiste/Loading";
import { useCart } from "@/context/CartContent";
import { axiosInstence } from "@/hooks/axiosInstence";
import { iCartResponse } from "@/types/types";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [cartDetails, setCartdetails] = useState<
    iCartResponse | null | undefined
  >(null);
  const [loading, setLoading] = useState(false);

  // get login user cart details
  const cart = useCart();

  // update cart quantity
  const handleUpdateCart = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await axiosInstence.put(
        "/cart/update-item-from-cart",
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );

      setCartdetails((prevCart) => {
        if (!prevCart || !prevCart.cartDetails) return prevCart;

        const updatedItems = prevCart.cartDetails.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        return {
          ...prevCart,
          cartDetails: {
            ...prevCart.cartDetails,
            items: updatedItems,
            totalPrice: response.data.cart.totalPrice,
          },
        };
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete product from cart
  const handleDelete = async (productId: string) => {
    try {
      await axiosInstence.delete(`/cart/delete-item-from-cart/${productId}`, {
        withCredentials: true,
      });

      setCartdetails((prevCart) => {
        if (!prevCart || !prevCart.cartDetails) return prevCart;

        const updatedItems = prevCart.items.filter(
          (item) => item.productId !== productId
        );

        return {
          ...prevCart,
          cart: updatedItems,
        };
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-1xl">
      <div className="flex items-center mb-6 border-b pb-4">
        <ShoppingBag className="text-red-600 mr-3" size={32} />
        <h1 className="text-3xl font-bold text-red-600">My Cart</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 bg-white rounded-lg shadow">
              <div className="text-lg font-medium text-gray-600">
                <LoadingPage />
              </div>
            </div>
          ) : cart?.cart?.items && cart.cart.items.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium flex items-center justify-between">
                <span>Shopping Cart ({cart?.cart?.items?.length} items)</span>
                <span>Price</span>
              </div>

              {cart.cart.items.map((item, index) => (
                <div
                  key={index}
                  className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Product Image */}
                    <div className="md:col-span-1">
                      <div className="aspect-square relative overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.image || "/images/product/placeholder.webp"}
                          alt={item.name}
                          fill
                          className="object-cover cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="md:col-span-2 flex flex-col">
                      <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                        {item.name}
                      </h2>
                      <div className="text-sm space-y-1 mb-3">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Status:</span>
                          <span className="text-green-600 font-medium">
                            In Stock
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Color:</span>
                          <span className="font-medium">
                            {cart?.cart?.color?.toUpperCase() || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Size:</span>
                          <span className="font-medium">
                            {cart?.cart?.size?.toUpperCase() || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Counter */}
                      <div className="flex items-center mt-auto">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            className="px-3 py-1 text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={item.quantity <= 1 || loading}
                            onClick={() =>
                              handleUpdateCart(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                          >
                            <span className="text-lg font-medium">−</span>
                          </button>
                          <span className="px-4 py-1 text-center min-w-8">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={loading}
                            onClick={() =>
                              handleUpdateCart(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <span className="text-lg font-medium">+</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleDelete(item.productId)}
                          className="ml-4 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          disabled={loading}
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="md:col-span-1 flex md:justify-end items-start">
                      <p className="text-lg font-bold text-red-600">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow py-16">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-600 mb-2">
                Your cart is empty
              </p>
              <p className="text-gray-500 mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link href="/products">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        {/* {
          cart.cart?.items.length === 0
        }
         */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
            <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium">
              Order Summary
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800">
                Your order qualifies for FREE shipping (excludes remote
                locations)
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart?.cart?.items?.length ?? 0} items)</span>
                  <span>${cart?.cart?.totalPrice ?? 0}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600">
                    ${cart?.cart?.totalPrice ?? 0}
                  </span>
                </div>
              </div>

              <Link
                href="/cart/checkout"
                className={`block w-full mt-6 text-center py-3 text-lg font-medium rounded ${
                  cart?.cart?.items?.length
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none"
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
