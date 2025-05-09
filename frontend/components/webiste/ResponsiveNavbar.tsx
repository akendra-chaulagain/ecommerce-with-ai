"use client";
import React, { useEffect, useState, PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronRight,
  X,
  Home,
  Store,
  Heart,
  ShoppingBag,
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

const ResponsiveNavbar: React.FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const showToast = useNotificationToast();
  const router = useRouter();
  const [searchtext, setSearchText] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white lg:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center py-2 px-4 text-center">
          <div className="font-medium mb-1 sm:mb-0 sm:mr-3 text-sm">
            25% DISCOUNT ON SCOTIA CREDIT CARD!
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          >
            SHOP NOW
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger className="w-full lg:hidden" asChild>
          <div className="flex items-center justify-between p-3 bg-white shadow-md sticky top-0 z-30">
            <div className="flex items-center ml-[10px]">
              <Menu size={29} className="text-gray-700 mr-3" />
            </div>

            <Link href="/" className="flex-1 flex justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={70}
                height={30}
                className="object-contain"
              />
            </Link>

            <div className="flex items-center gap-5">
              <Link href="/cart" className="flex items-center text-gray-700">
                <div className="relative">
                  <ShoppingCart size={28} />
                </div>
              </Link>
            </div>
          </div>
        </SheetTrigger>

        {/* Search Bar */}
        <div className="relative px-3 py-2 bg-gray-50 lg:hidden top-6 z-20 shadow-sm">
          <div className="relative">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-all"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <button
              onClick={handleClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Sheet Content */}
        <SheetContent side="left" className="max-w-xs w-full p-0">
          <SheetTitle asChild>
            <VisuallyHidden>Mobile navigation menu</VisuallyHidden>
          </SheetTitle>
          <div className="h-full flex flex-col bg-white">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsSheetOpen(false)}></button>
            </div>

            {user.user && (
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <Link href={"/profile"}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      <User size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">
                        {user.user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user.user.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="flex-1 overflow-auto">
              <div className="border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Home size={18} className="mr-3 text-red-600" />
                  <span className="font-medium">Home</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href="/products"
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Store size={18} className="mr-3 text-red-600" />
                  <span className="font-medium">All Products</span>
                </Link>
              </div>

              <div className="border-b border-gray-200">
                <Link
                  href="/order"
                  className="flex items-center px-4 py-3 hover:bg-gray-50"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-3 text-red-600" />
                  <span className="font-medium">My Orders</span>
                </Link>
              </div>

              <div className="py-2 px-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Categories
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
                                onClick={() => setIsSheetOpen(false)}
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
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {data.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-gray-200">
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                {user.user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center justify-center py-4 hover:bg-gray-50 text-sm font-medium text-gray-700"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <User size={16} className="mr-2 text-red-600" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogoutUser();
                        setIsSheetOpen(false);
                      }}
                      className="flex items-center justify-center py-4 hover:bg-gray-50 text-sm font-medium text-gray-700"
                    >
                      <ShoppingBag size={16} className="mr-2 text-red-600" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center py-4 hover:bg-gray-50 text-sm font-medium text-gray-700"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <User size={16} className="mr-2 text-red-600" />
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center py-4 hover:bg-gray-50 text-sm font-medium text-gray-700"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ShoppingBag size={16} className="mr-2 text-red-600" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navbar */}
      <div className="hidden lg:block">{children}</div>

      {/* Extra padding for mobile to account for bottom navigation */}
      <div className="pb-10 lg:pb-0"></div>
    </>
  );
};

export default ResponsiveNavbar;
