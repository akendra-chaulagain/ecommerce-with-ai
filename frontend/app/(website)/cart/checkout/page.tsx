// CheckoutPage.jsx
"use client";
import { useCart } from "@/context/CartContent";

import Image from "next/image";
import React, { useState } from "react";
import Paypal from "@/components/webiste/Paypal";
import { Button } from "@/components/ui/button";
import { useShippingAddress } from "@/context/ShippingContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

import axios from "axios";

const CheckoutPage = () => {
  const toast = useNotificationToast();

  const cart = useCart();
  const [showPaypal, setShowPaypal] = useState(false); // State to manage PayPal button visibility
  const shippingAddress = useShippingAddress();

  const [error, setError] = useState("");
  console.log(error);

  //  total price
  const subtotal = cart?.cart?.totalPrice || 0;
  const shippingCost = 5.99;
  const tax = 0.13 * subtotal;
  const totalPrice = (subtotal + shippingCost + tax).toFixed(2);

  // for paypal handle payment
  const handlePayment = () => {
    setShowPaypal(true); // Show PayPal button on click
  };

  const [name, setName] = useState(
    shippingAddress?.shippingAddress?.data?.name || ""
  );
  const [contact, setContact] = useState(
    shippingAddress?.shippingAddress?.data?.contact || " "
  );
  const [country, setCountry] = useState(
    shippingAddress?.shippingAddress?.data?.country || " "
  );
  const [street, setStreet] = useState(
    shippingAddress?.shippingAddress?.data?.street || " "
  );
  const [city, setCity] = useState(
    shippingAddress?.shippingAddress?.data?.city || " "
  );
  const [state, setState] = useState(
    shippingAddress?.shippingAddress?.data?.state || " "
  );
  const [zip, setZip] = useState(
    shippingAddress?.shippingAddress?.data?.zip || " "
  );

  // add shipping address

  // hande edit\
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const updatedData = {
      name,
      contact,
      country,
      street,
      city,
      state,
      zip,
    };

    try {
      await axiosInstence.put(
        `/shipping/update-shipping-details/${shippingAddress?.shippingAddress?.data?._id}`,
        updatedData,
        { withCredentials: true }
      );
      toast("Shipping address updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An unknown error occurred.");
      } else {
        setError("Network error or server not reachable.");
      }
    }
  };
  // add address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Submit the form data (for example, send it to your backend)

    try {
      await axiosInstence.post(
        "/shipping/add-shipping-details",
        {
          name,
          contact,
          country,
          street,
          city,
          state,
          zip,
        },

        { withCredentials: true }
      );
      toast("Shipping address saved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        setError(errorMessage);
      } else {
        setError("Network error or server not reachable.");
      }

      // console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Customer Information */}
          <div className="w-full md:w-2/3">
            {/* Address Section */}
            {shippingAddress && shippingAddress?.shippingAddress?.data ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className=" font-semibold mb-4 font-white text-red-600">
                  {/* <h2 className="px-6 py-4 rounded bg-red-600 text-white font-medium"> */}
                  Shipping Address
                </h2>
                {/* shoing user address */}
                <form>
                  <div className="grid grid-cols-1  gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-[20px]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={shippingAddress?.shippingAddress?.data?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={shippingAddress?.shippingAddress?.data?.contact}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>

                    <input
                      type="tel"
                      value={shippingAddress?.shippingAddress?.data?.country}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingAddress?.shippingAddress?.data?.street}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        value={shippingAddress?.shippingAddress?.data?.city}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        value={shippingAddress?.shippingAddress?.data?.state}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        value={shippingAddress?.shippingAddress?.data?.zip}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    {/* edit shipping address */}
                    <Dialog>
                      <DialogTrigger asChild>
                        {/* <Button variant="outline">Edit Profile</Button> */}

                        <span className="underline text-[14px] text-red-600 cursor-pointer">
                          Edit Address
                        </span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle> Edit Shipping Address</DialogTitle>
                          <DialogDescription>
                            Enter a new billing address.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-white p-3 rounded-lg mb-6">
                          <h2 className=" font-semibold mb-4 font-white">
                            Shipping Address
                          </h2>

                          <form>
                            <div className="grid grid-cols-1  gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name
                                </label>
                                <input
                                  name="name"
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  // placeholder={
                                  //   shippingAddress?.shippingAddress?.data?.name
                                  // }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                              </label>
                              <input
                                onChange={(e) => setContact(e.target.value)}
                                name="contact"
                                type="tel"
                                value={contact}
                                // placeholder={
                                //   shippingAddress?.shippingAddress?.data
                                //     ?.contact
                                // }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              />
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                              </label>

                              <input
                                onChange={(e) => setCountry(e.target.value)}
                                name="country"
                                type="tel"
                                value={country}
                                // placeholder={
                                //   shippingAddress?.shippingAddress?.data
                                //     ?.country
                                // }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              />
                            </div>

                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                              </label>
                              <input
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                name="street"
                                type="text"
                                // placeholder={
                                //   shippingAddress?.shippingAddress?.data?.street
                                // }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  City
                                </label>
                                <input
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  name="city"
                                  // placeholder={
                                  //   shippingAddress?.shippingAddress?.data?.city
                                  // }
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  State/Province
                                </label>
                                <input
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  name="state"
                                  // placeholder={
                                  //   shippingAddress?.shippingAddress?.data
                                  //     ?.state
                                  // }
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Postal Code
                                </label>
                                <input
                                  onChange={(e) => setZip(e.target.value)}
                                  name="zip"
                                  value={zip}
                                  // placeholder={
                                  //   shippingAddress?.shippingAddress?.data?.zip
                                  // }
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                              </div>
                            </div>
                          </form>
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={handleUpdate}
                            type="submit"
                            className=" bg-red-500 rounded flex items-center justify-center cursor-pointer hover:bg-white hover:text-black "
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>
              </div>
            ) : (
              // add shipping address
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    {/* <Button variant="outline">Edit Profile</Button> */}
                    <div className="h-16 bg-red-500 rounded flex items-center justify-center cursor-pointer">
                      <p className="text-center text-white font-semibold">
                        Add Shipping Address
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle> Add Shipping Address</DialogTitle>
                      <DialogDescription>
                        Enter a new billing address.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="bg-white p-3 rounded-lg mb-6">
                      <h2 className=" font-semibold mb-4 font-white">
                        Shipping Address
                      </h2>

                      <form>
                        <div className="grid grid-cols-1  gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              value={
                                shippingAddress?.shippingAddress?.data?.name
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            onChange={(e) => setContact(e.target.value)}
                            value={
                              shippingAddress?.shippingAddress?.data?.contact
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>

                          <input
                            type="tel"
                            onChange={(e) => setCountry(e.target.value)}
                            value={
                              shippingAddress?.shippingAddress?.data?.country
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            onChange={(e) => setStreet(e.target.value)}
                            type="text"
                            value={
                              shippingAddress?.shippingAddress?.data?.street
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              onChange={(e) => setCity(e.target.value)}
                              value={
                                shippingAddress?.shippingAddress?.data?.city
                              }
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province
                            </label>
                            <input
                              onChange={(e) => setState(e.target.value)}
                              value={
                                shippingAddress?.shippingAddress?.data?.state
                              }
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code
                            </label>
                            <input
                              onChange={(e) => setZip(e.target.value)}
                              value={
                                shippingAddress?.shippingAddress?.data?.zip
                              }
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        className=" bg-red-500 rounded flex items-center justify-center cursor-pointer hover:bg-white hover:text-black "
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}

            {/* Product Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              {cart?.cart?.items?.map((data, index) => (
                <div className="border-b pb-4" key={index}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded">
                      <Image
                        src={data.image}
                        alt="logo"
                        width={100}
                        height={100}
                        className=" flex justify-center object-fill cursor-pointer "
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{data.name.slice(0,100)}...</h3>
                      <p className="text-sm text-red-600">
                        Size: {cart?.cart?.size.toUpperCase()} | Color: {cart?.cart?.color.toUpperCase()}
                      </p>
                      <p className="text-[12px] font-semibold">
                        quantity; {data.quantity}
                      </p>
                    </div>
                    <div className="font-medium">${data.price}</div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cart?.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax (13%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total Price (including shipping)</span>
                  <span>
                    {/* $ {(0.13 * (cart?.cart?.totalPrice || 0)).toFixed(2)}
                     */}
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Section */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>

              {!shippingAddress?.shippingAddress?.data && (
                <p className="text-red-600 text-center font-medium mb-2">
                  Please add a shipping address first!
                </p>
              )}
              <Button
                onClick={handlePayment}
                className="w-full py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition mb-[10px]"
              >
                Pay ${totalPrice}
              </Button>

              {/* Show PayPal only if shippingAddress exists */}
              {shippingAddress?.shippingAddress?.data && showPaypal && (
                <Paypal totalPrice={totalPrice} />
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                Your personal data will be used to process your order, support
                your experience, and for other purposes described in our privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
