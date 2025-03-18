import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
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
            {/* <div className="grid sm:grid-cols-5 lg:grid-cols-5  grid-cols-1 mb-[20px]  "> */}
            <div className="grid sm:grid-cols-5 lg:grid-cols-5  grid-cols-2 mb-[20px]  ">
              <div className="w-full max-w-lg mx-auto sm:flex sm:justify-center md:flex md:justify-center">
                <Image
                  src="/images/product/1.webp"
                  alt="logo"
                  width={400}
                  height={200}
                  className=" object-cover cursor-pointer "
                />
              </div>
              {/* items details */}
              <div className=" sm:col-span-3 ml-[30px]">
                <h2 className="text-[17px] font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.....
                </h2>
                <span className="text-red-600 cursor-pointer text-[13px]">
                  In Stock
                </span>
                <br />
                {/* items shipping details */}
                <span className="text-gray-600 cursor-pointer text-[14px]">
                  Ships from and sold by Amazon.ca
                </span>
                <br />
                <span className="text-gray-600 text-[15px]">
                  Eligible for FREE Shipping
                </span>

                {/* item counter */}

                <div className="flex mt-[20px] mb-[10px]">
                  <div className="flex items-center gap-6 border-2 px-[16px] py-[3px]">
                    <span className=" cursor-pointer hover:text-red-600">
                      <Trash2 size={"19px"} />
                    </span>
                    <p className="text-[20px] font-semibold ">1</p>{" "}
                    <span className="text-[20px] cursor-pointer  hover:text-red-600">
                      +
                    </span>
                  </div>
                </div>
                <Link
                  href="/category/1"
                  className="text-[15px] text-red-600 underline"
                >
                  Product details
                </Link>
                <p className="text-[20px] mt-[10px] font-semibold sm:hidden sm:block ">
                  $467.99
                </p>
              </div>
              {/* hidden md:block */}
              <div className="flex justify-center">
                <p className="text-[20px] font-semibold sm:block hidden">
                  {" "}
                  $467.99
                </p>
              </div>
            </div>

            {/* second item */}

            <div className="grid sm:grid-cols-5 lg:grid-cols-5  grid-cols-2 mb-[20px]  ">
              <div className="w-full max-w-lg mx-auto sm:flex sm:justify-center md:flex md:justify-center">
                <Image
                  src="/images/product/1.webp"
                  alt="logo"
                  width={400}
                  height={200}
                  className=" object-cover cursor-pointer "
                />
              </div>
              {/* items details */}
              <div className=" sm:col-span-3 ml-[30px]">
                <h2 className="text-[17px] font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.....
                </h2>
                <span className="text-red-600 cursor-pointer text-[13px]">
                  In Stock
                </span>
                <br />
                {/* items shipping details */}
                <span className="text-gray-600 cursor-pointer text-[14px]">
                  Ships from and sold by Amazon.ca
                </span>
                <br />
                <span className="text-gray-600 text-[15px]">
                  Eligible for FREE Shipping
                </span>

                {/* item counter */}

                <div className="flex mt-[20px] mb-[10px]">
                  <div className="flex items-center gap-6 border-2 px-[16px] py-[3px]">
                    <span className=" cursor-pointer hover:text-red-600">
                      <Trash2 size={"19px"} />
                    </span>
                    <p className="text-[20px] font-semibold ">1</p>{" "}
                    <span className="text-[20px] cursor-pointer  hover:text-red-600">
                      +
                    </span>
                  </div>
                </div>
                <Link
                  href="/category/1"
                  className="text-[15px] text-red-600 underline"
                >
                  Product details
                </Link>
                <p className="text-[20px] mt-[10px] font-semibold sm:hidden sm:block ">
                  $467.99
                </p>
              </div>
              {/* hidden md:block */}
              <div className="flex justify-center">
                <p className="text-[20px] font-semibold sm:block hidden">
                  {" "}
                  $467.99
                </p>
              </div>
            </div>

            {/* sub totel */}

            <hr className="mt-[20px]" />
            <div className="flex justify-end">
              <p>
                Subtotal (1 item):{" "}
                <span className="font-bold text-[18px]">$1,249.00</span>{" "}
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
                <h3>Items (2):</h3>
                <h3>Shipping:</h3>
                <h3>GST/HST:</h3>
                <h3 className="font-semibold">Total:</h3>
              </div>
              <div>
                <h3>$378.00</h3>
                <h3>$48.59</h3>
                <h3>$78.06</h3>
                <h3 className="font-semibold">$541.88</h3>
              </div>
            </div>

            <div className="mt-[20px]">
              <Button className="bg-red-600 text-white border-2 w-full hover:text-black hover:bg-white px-[40px] py-[25px]">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
