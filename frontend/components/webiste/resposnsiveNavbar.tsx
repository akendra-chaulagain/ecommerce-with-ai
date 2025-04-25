"use client";

import React, { useEffect, useState, PropsWithChildren } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useRouter } from "next/navigation";

const ResponsiveNavBar: React.FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const router = useRouter();
  const [searchtext, setSearchText] = useState("");

  const handleClick = () => {
    router.push(`/search?q=${searchtext}`);
  };

  const getAllCategories = async () => {
    try {
      const res = await axiosInstence.get(`/category/tree`, {
        withCredentials: true,
      });
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  

  return (
    <>
      {/* Mobile Top Offer Banner */}
      <div className="bg-black text-white text-[14px] lg:hidden">
        <div className="items-center sm:flex sm:justify-center md:flex md:justify-center grid justify-center p-1.5">
          <div className="cursor-pointer pr-[14px]">
            25% DISCOUNT ON SCOTIA CREDIT CARD!
          </div>
          <div className="flex justify-center cursor-pointer text-[#c1c1c1]">
            <Link
              href="/products"
              className="underline mr-[7px] hover:text-white"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sheet Menu */}
      <Sheet>
        <SheetTrigger className="w-full lg:hidden mt-[10px] px-[6px]">
          <div className="grid grid-cols-7 items-center">
            <Menu size={30} />
            <div className="flex justify-start cursor-pointer">
              <MapPin />
            </div>
            <div className="col-span-3">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={180}
                  height={60}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div>
              <Link
                href="/register"
                className="flex justify-end cursor-pointer"
              >
                <User />
              </Link>
            </div>
            <div>
              <Link href="/cart" className="flex justify-end cursor-pointer">
                <ShoppingCart />
                <span className="mr-[7px] hover:underline">(0)</span>
              </Link>
            </div>
          </div>
        </SheetTrigger>

        {/* Search Bar */}
        <div className="relative mt-[10px] lg:hidden">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search"
            className="pr-8 pl-4 py-2 border w-full outline-none"
          />
          <span className="absolute inset-y-0 right-2 flex items-center">
            <Search onClick={handleClick} className="cursor-pointer" />
          </span>
        </div>

        {/* Mobile Sheet Content */}
        <SheetContent>
          <div>
            <h1 className="text-[18px] font-bold mb-[10px] text-red-600">
              MENU
            </h1>
            <hr />
            <div className="my-[12px]">
              <Link href="/" className="font-bold text-[14px] text-red-600">
                Home
              </Link>
            </div>
            <hr />
            {category.map((data, index) => (
              <div className="my-[12px] text-red-600" key={index}>
                {data.children && data.children.length > 0 ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-[14px] font-bold">
                        {data.name}
                      </AccordionTrigger>
                      {data.children.map((subdata, subIndex) => (
                        <AccordionContent key={subIndex}>
                          <Link href={`/category/${subdata._id}`}>
                            - {subdata.name}
                          </Link>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <>
                    <Link
                      href={`/category/${data._id}`}
                      className="block text-[14px] font-bold mt-4 mb-4"
                    >
                      {data.name}
                    </Link>
                    <hr />
                  </>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navbar */}
      <div className="hidden lg:block">{children}</div>
    </>
  );
};

export default ResponsiveNavBar;
