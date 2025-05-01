"use client";
import React, { useState } from "react";
import {
  CreditCard,
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
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

const Logobar = () => {
  const router = useRouter();
  const user = useAuth();
  const cart = useCart();
  const [searchtext, setSearchText] = useState("");
  const handleClick = () => {
    router.push(`/search?q=${searchtext}`); // This adds query params
  };

  const [open, setOpen] = useState(false);

  const handleSelect = () => {
    setOpen(false); // Close dropdown after selection
  };
  return (
    <>
      <div className=" h-auto mt-[25px] px-[10px]  hidden  sm:hidden lg:block">
        <div className="grid grid-cols-3 gap-2 text-[15px]  text-gray-700">
          <div className="  ">
            {/* location */}
            <div className="flex">
              <div className="flex  mr-[30px]">
                <span>
                  <CreditCard />
                </span>
                <span className="ml-[5px]">We Accept Paypal</span>
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
          <div className="flex justify-between items-center">
            <div className="flex  border border-gray-500 px-[13px] py-[4px]">
              <span>
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search"
                  className="outline-none"
                />
              </span>

              <span className="cursor-pointer">
                <Search onClick={handleClick} />
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
                <span className="ml-[7px] hover:underline">Orders</span>
              </Link>
            )}
            {/* <Link href="/profile" className="flex cursor-pointer"> */}
            <div className="relative">
              <Select open={open} onOpenChange={setOpen}>
                <SelectTrigger className="focus:outline-none focus:ring-0 border-none p-0">
                  <Settings className="  cursor-pointer" />
                </SelectTrigger>

                <SelectContent className="w-40 bg-white shadow-lg rounded-md p-2">
                  <Link href="/profile" onClick={handleSelect}>
                    <span className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Profile
                    </span>
                  </Link>
                  <Link href="/logout" onClick={handleSelect}>
                    <span className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Log out
                    </span>
                  </Link>
                </SelectContent>
              </Select>
            </div>

            <span className="ml-[7px] hover:underline"> </span>
            {/* </Link> */}
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
