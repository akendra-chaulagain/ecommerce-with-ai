// CheckoutPage.jsx
"use client";
import { useCart } from "@/context/CartContent";

import Image from "next/image";
import React, { useState } from "react";
import Paypal from "@/components/Paypal";
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
import useCountries from "@/hooks/fetchCountry";

const CheckoutPage = () => {
  const { countries } = useCountries();

  const cart = useCart();
  const [showPaypal, setShowPaypal] = useState(false); // State to manage PayPal button visibility
  const shippingAddress = useShippingAddress();

  //  total price
  const subtotal = cart?.cart?.totalPrice || 0;
  const shippingCost = 5.99;
  const tax = 0.13 * subtotal;
  const totalPrice = subtotal + shippingCost + tax;

  // for paypal handle payment
  const handlePayment = () => {
    setShowPaypal(true); // Show PayPal button on click
  };

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the specific field based on the input's name
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit the form data (for example, send it to your backend)
    console.log("Form submitted:", formData);
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
                        type="text"
                        value={shippingAddress?.shippingAddress?.data?.fullname}
                        className="w-full p-2 border border-gray-300 rounded"
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
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>

                    <input
                      type="tel"
                      value={
                        shippingAddress?.shippingAddress?.data?.address?.country
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={
                        shippingAddress?.shippingAddress?.data?.address?.street
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        value={
                          shippingAddress?.shippingAddress?.data?.address?.city
                        }
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        value={
                          shippingAddress?.shippingAddress?.data?.address?.state
                        }
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        value={
                          shippingAddress?.shippingAddress?.data.address.zip
                        }
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <span className="underline text-[14px] text-red-600 cursor-pointer">
                      Edit Address
                    </span>
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

                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1  gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded"
                            name="country"
                            value={formData.country} // Bind value to formData.country
                            onChange={handleInputChange} // Handle onChange event
                          >
                            {countries.map((country, index) => (
                              <option key={index} value={country}>
                                {country}
                              </option>
                            ))}
                            {/* Option for United States, will still be dynamically handled */}
                            <option value="United States">United States</option>
                          </select>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province
                            </label>
                            <input
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code
                            </label>
                            <input
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <DialogFooter>
                      <Button
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
                      <h3 className="font-medium">{data.name}</h3>
                      <p className="text-sm text-gray-600">
                        Size: Medium | Color: Blue
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
                <Paypal />
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
