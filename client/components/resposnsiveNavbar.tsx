import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { MapPin, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const resposnsiveBar = () => {
  return (
    <>
      {/* offer on top of the screen  */}

      <div className=" bg-black h-auto  w-auto text-white text-[14px]  lg:hidden">
        {/* <div className="flex justify -center items-center p-1.5 sm:flex sm:justify-start"> */}
        <div className=" items-center sm:flex sm:justify-center md:flex md:justify-center grid  justify-center p-1.5">
          <div className="cursor-pointer pr-[14px] ">
            25% DISCOUNT ON SCOTIA CREDIT CARD!
          </div>
          <div className=" flex justify-center cursor-pointer text-[#c1c1c1]">
            <Link
              href="/category"
              className="underline mr-[7px] hover:text-white"
            >
              SHOP NOW
            </Link>
            <span className="mr-[7px] ">|</span>
            <Link href="/category/1" className="underline hover:text-white">
              DETAILS
            </Link>
          </div>
        </div>
      </div>

      <Sheet>
        <SheetTrigger className="w-full lg:hidden mt-[10px] pr-[6px] pl-[6px] ">
          {/* <SheetTrigger className="grid grid-cols-7 items-center lg:hidden"> */}
          <div className="grid grid-cols-7 items-center">
            {/* menu button */}
            <Menu size={30} />

            {/* location icon */}
            <div className="flex justify-start cursor-pointer">
              <MapPin />
            </div>
            {/* logo */}
            <div className=" col-span-3">
              <Link href={"/"}>
                {" "}
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={180}
                  height={60}
                  className="flex justify-center cursor-pointer"
                />
              </Link>
            </div>

            {/* login icons */}
            <div>
              <Link
                href="/register"
                className="flex justify-end cursor-pointer"
              >
                <span>
                  <User />
                </span>
              </Link>
            </div>
            {/* cart */}
            <div>
              <Link
                href="/register"
                className="flex justify-end cursor-pointer"
              >
                <span>
                  <ShoppingCart />
                </span>
                <span className="mr-[7px] hover:underline">(0)</span>
              </Link>
            </div>
          </div>
        </SheetTrigger>

        {/* search bar */}

        <div className="relative mt-[10px] lg:hidden ">
          <span>
            <input
              type="text"
              placeholder="Enter text..."
              className="pr-8 pl-4 py-2 border  w-full outline-none"
            />
          </span>
          <span className="absolute inset-y-0 right-2 flex items-center ">
            <Search />
          </span>
        </div>

        <SheetContent>
          <div>
            <h1 className="text-[17px] font-bold mb-[10px]">MENU</h1>
            <div>
              <hr />
              <div className="my-[12px]">
                <Link href="/" className=" font-bold text-[13px]">
                  Home
                </Link>
              </div>
              <hr />
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  New Arrivals
                </Link>
              </div>
              <hr />
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Clothing
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Shoes
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Accessories
                </Link>
              </div>
              <hr />
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Petite
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Plus
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  T By Talbots
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Haven well Within
                </Link>
              </div>
              <hr />
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  The Edit
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/category" className=" font-bold text-[13px]">
                  Sale
                </Link>
              </div>
              <hr />{" "}
              <div className="my-[12px]">
                <Link href="/register" className=" font-bold text-[13px]">
                  Sign In
                </Link>
              </div>
              <hr />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default resposnsiveBar;
