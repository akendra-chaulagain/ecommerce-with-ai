// CheckoutPage.jsx
import { useCart } from "@/context/CartContent";
import React from "react";

const CheckoutPage = () => {
  const cart = useCart();

  const subtotal = cart?.cart?.totalPrice || 0;
  const shippingCost = 5.99;
  const tax = 0.13 * subtotal;
  const totalPrice = subtotal + shippingCost + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Customer Information */}
        <div className="w-full md:w-2/3">
          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </form>
          </div>

          {/* Product Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>

            <div className="border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-grow">
                  <h3 className="font-medium">Product Name</h3>
                  <p className="text-sm text-gray-600">
                    Size: Medium | Color: Blue
                  </p>
                </div>
                <div className="font-medium">$99.99</div>
              </div>
            </div>

            <div className="border-b py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-grow">
                  <h3 className="font-medium">Another Product</h3>
                  <p className="text-sm text-gray-600">
                    Size: Large | Color: Black
                  </p>
                </div>
                <div className="font-medium">$49.99</div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$149.98</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>$9.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>$164.97</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <div className="mb-6">
              <div className="border rounded p-4 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    checked
                  />
                  <label htmlFor="credit-card">Credit Card</label>
                </div>
              </div>

              <div className="border rounded p-4 mb-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="paypal" name="payment-method" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="123"
                />
              </div>
            </div>

            <button className="w-full py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition">
              Pay $164.97
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your personal data will be used to process your order, support
              your experience, and for other purposes described in our privacy
              policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
