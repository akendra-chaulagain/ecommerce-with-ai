"use client";

import React, { useEffect, useState, PropsWithChildren } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronRight,
} from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { useNotificationToast } from "@/hooks/toast";

const ResponsiveNavBar: React.FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const showToast = useNotificationToast();
  const router = useRouter();
  const [searchtext, setSearchText] = useState("");

  const handleClick = () => {
    if (searchtext.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchtext)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchtext.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchtext)}`);
    }
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

  const user = useAuth();
  
  

  // handle logout
  const handleLogoutUser = async () => {
    try {
      await axiosInstence.post(
        "/users/logout-user",
        {},

        {
          withCredentials: true,
        }
      );
      showToast("Logout successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
      showToast("Logout failed");
    }
  };

  return (
    <>
      {/* Mobile Top Offer Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-sm lg:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center py-2 px-4 text-center">
          <div className="font-medium mb-1 sm:mb-0 sm:mr-3">
            25% DISCOUNT ON SCOTIA CREDIT CARD!
          </div>
          <Link
            href="/products"
            className="inline-flex items-center font-semibold px-3 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          >
            SHOP NOW
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger className="w-full lg:hidden">
          <div className="flex items-center justify-between p-3 bg-white shadow-sm">
            <div className="flex items-center">
              <Menu size={24} className="text-gray-600 mr-4" />
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-1" />
                <span className="text-xs font-medium text-gray-500 hidden sm:block">
                  My Location
                </span>
              </div>
            </div>

            <Link href="/" className="flex-1 flex justify-center">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={140}
                height={40}
                className="object-contain"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href={user.user ? "/profile" : "/register"}
                className="flex items-center text-gray-600"
              >
                <User size={20} />
              </Link>

              <Link href="/cart" className="flex items-center text-gray-600">
                <div className="relative">
                  <ShoppingCart size={20} />
                </div>
              </Link>
            </div>
          </div>
        </SheetTrigger>

        {/* Search Bar */}
        <div className="relative px-3 py-2 bg-gray-50 lg:hidden">
          <div className="relative">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <button
              onClick={handleClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Sheet Content */}
        <SheetContent side="left" className="max-w-xs w-full p-0">
          <div className="h-full flex flex-col bg-white">
            <div className="bg-red-600 text-white p-4">
              <h2 className="text-xl font-bold">Menu</h2>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                >
                  <span className="font-medium">Home</span>
                </Link>
              </div>

              {category.map((data, index) => (
                <div className="border-b border-gray-200" key={index}>
                  {data.children && data.children.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value={`item-${index}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="px-4 py-3 font-medium hover:bg-gray-50 hover:no-underline">
                          {data.name}
                        </AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="space-y-1 py-1">
                            {data.children.map((subdata, subIndex) => (
                              <Link
                                key={subIndex}
                                href={`/category/${subdata._id}`}
                                className="flex items-center pl-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                              >
                                <span className="mr-2">•</span>
                                {subdata.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={`/category/${data._id}`}
                      className="flex items-center px-4 py-3 font-medium hover:bg-gray-50"
                    >
                      {data.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-gray-200 p-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                {user.user ? (
                  <Link
                    href="/profile"
                    className="flex items-center hover:text-red-600"
                  >
                    <User size={16} className="mr-2" />

                    <span onClick={handleLogoutUser}>Logout</span>
                  </Link>
                ) : (
                  <Link href="/login">
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navbar */}
      <div className="hidden lg:block">{children}</div>
    </>
  );
};

export default ResponsiveNavBar;
