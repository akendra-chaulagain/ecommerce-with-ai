"use client";
import Paypal from "@/components/Paypal";
import { Button } from "@/components/ui/button";

import { axiosInstence } from "@/hooks/axiosInstence";

import { iCartResponse } from "@/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [cart, setCart] = useState<iCartResponse | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false); // State to manage PayPal button visibility

  // get login user cart details
  const getCartdetails = async () => {
    try {
      const response = await axiosInstence.get<iCartResponse>("/cart", {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartdetails();
  }, []);

  // update cart quantity
  const handleUpdateCart = async (productId: string, quantity: number) => {
    console.log(quantity);

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

      // Update state with new cart data
      setCart((prevCart) => {
        if (!prevCart || !prevCart.cart) return prevCart;

        const updatedItems = prevCart.cart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        return {
          ...prevCart,
          cart: {
            ...prevCart.cart,
            items: updatedItems,
            totalPrice: response.data.cart.totalPrice, // Update totalPrice here
          },
        };
      });
      getCartdetails();
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

      // Update the state to reflect the deleted item
      setCart((prevCart) => {
        if (!prevCart || !prevCart.cart) return prevCart;

        // Filter out the deleted item
        const updatedItems = prevCart.cart.items.filter(
          (item) => item.productId !== productId
        );

        return {
          ...prevCart,
          cart: { ...prevCart.cart, items: updatedItems },
        };
      });

      // Re-fetch the updated cart data from the backend
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = () => {
    setShowPaypal(true); // Show PayPal button on click
  };

  return (
    <>
      {/* <div className="grid sm:grid-cols-1 md:grid-cols-1  grid-cols-1 lg:grid-cols-5"> */}

      <div className="mt-[45px] px-[30px] ">
        <h1 className="flex justify-center text-[30px] font-semibold my-[20px]">
          MY CART
        </h1>

        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mt-[20px]">
          <div
            // className="col-span-3  gap-2  bg-[#f7f7f7]
            className="col-span-3  gap-2  bg-[#f7f7f7] 
 "
          >
            {loading ? (
              <h1>Loading ....</h1>
            ) : cart?.cart?.items && cart.cart.items.length > 0 ? (
              cart.cart.items.map((item, index) => (
                <div
                  className="grid sm:grid-cols-5 lg:grid-cols-5 grid-cols-2 mb-5 p-4 border rounded-lg bg-white shadow-sm"
                  key={index}
                >
                  {/* Product Image */}
                  <div className="w-full max-w-lg mx-auto sm:flex sm:justify-center">
                    <Image
                      src={item.image || "/images/product/placeholder.webp"}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="object-cover cursor-pointer rounded-md"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="sm:col-span-3 ml-5">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <span className="text-red-600 text-sm">In Stock</span>
                    <p className="text-gray-600 text-sm">Ships from Amazon</p>

                    {/* Quantity Counter */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        className="border px-3 py-1 text-lg"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          handleUpdateCart(item.productId, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <p className="text-lg font-semibold">{item.quantity}</p>
                      <button
                        disabled={loading}
                        className="border px-3 py-1 text-lg"
                        onClick={() =>
                          handleUpdateCart(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <span className="cursor-pointer hover:text-red-600">
                        <Trash2
                          size={"19px"}
                          onClick={() => handleDelete(item.productId)}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="flex justify-center">
                    <p className="text-lg font-semibold">${item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg mt-[40px] font-bold">
                Your cart is empty.
              </p>
            )}

            <hr className="mt-[20px]" />
            <div className="flex justify-end">
              <p>
                Subtotal ({cart?.cart?.items?.length ?? 0} item):{" "}
                <span className="font-bold text-[18px]">
                  ${cart?.cart?.totalPrice ?? 0}
                </span>{" "}
              </p>
            </div>
          </div>
          {/* checkout */}
          <div className=" bg-[#f7f7f7] px-[30px] py-[30px] h-[290px]">
            <span className="text-red-600 text-[12px] ">
              Your order qualifies for FREE shipping (excludes remote locations)
            </span>
            <hr />
            <div className="flex justify-between mt-[10px] text-[17px]">
              <div>
                <h3 className="font-semibold">Total:</h3>
              </div>
              <div>
                <h3 className="font-semibold">
                  {" "}
                  ${cart?.cart?.totalPrice ?? 0}
                </h3>
              </div>
            </div>

            <div className="mt-[20px]">
              <Button
                onClick={handlePayment}
                className="bg-red-600 text-white border-2 w-full hover:text-black hover:bg-white px-[40px] py-[25px]"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
        {/* Conditionally render PayPal component */}
        {showPaypal && <Paypal />}
      </div>
    </>
  );
};

export default Page;
