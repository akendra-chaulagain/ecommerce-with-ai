"use client";
import React from "react";
import {
  CreditCard,
  LucidePackageOpen,
  MapPin,
  Search,
  Settings,
  ShoppingCart,
  User,
  
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContent";

const Logobar = () => {
  const user = useAuth();
  const cart = useCart(); // login user cart details

  return (
    <>
      <div className=" h-auto mt-[25px] px-[10px]  hidden  sm:hidden lg:block">
        <div className="grid grid-cols-3 gap-2 text-[15px]  text-gray-700">
          <div className="  ">
            {/* location */}
            <div className="flex">
              <div className="flex cursor-pointer mr-[30px]">
                <span>
                  <CreditCard />
                </span>
                <span className="ml-[5px]">Scotia Bank Card</span>
              </div>
              <div className="flex cursor-pointer">
                <span className="">
                  <MapPin />
                </span>
                <Link href={""} className="ml-[5px]">
                  Store Locator
                </Link>
              </div>
            </div>
          </div>
          {/* logo */}
          <div className="flex justify-center">
            <Link href={"/"}>
              {" "}
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={250}
                height={250}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* search */}
          <div className="flex justify-between">
            <div className="flex  border border-gray-500 px-[13px] py-[4px]">
              <span>
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search"
                  className="outline-none"
                />
              </span>

              <span className="cursor-pointer">
                <Search />
              </span>
            </div>

            {user.user === null ? (
              <Link href="/register" className="flex cursor-pointer">
                <span>
                  <User />
                </span>
                <span className="ml-[7px] hover:underline">Sign in</span>
              </Link>
            ) : (
              <Link href="/order" className="flex cursor-pointer">
                <span>
                  <LucidePackageOpen />
                </span>
                <span className="ml-[7px] hover:underline">Orders</span>
              </Link>
            )}
            <Link href="/profile" className="flex cursor-pointer">
              <span>
                <Settings />
              </span>
              <span className="ml-[7px] hover:underline"> </span>
            </Link>
            <Link href="/cart" className="flex cursor-pointer">
              <span>
                <ShoppingCart />
              </span>
              <span className="ml-[7px] hover:underline">
                {" "}
                ({cart?.cart?.items.length})
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logobar;
