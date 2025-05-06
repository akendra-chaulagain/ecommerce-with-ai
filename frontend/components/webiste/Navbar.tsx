"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { axiosInstence } from "@/hooks/axiosInstence";
import { ICategory } from "@/types/types";
import { ChevronDown, Home, Tag } from "lucide-react";

const Navbar = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  // Get all categories
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
    // <div className="bg-white shadow-sm sticky top-0 z-50  mt-[10px] mb-[10px]">
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="hidden lg:block">
          <div className="flex items-center h-16">
            <nav className="flex-1">
              <ul className="flex justify-between items-center space-x-1">
                <li>
                  <Link
                    href="/"
                    className="flex items-center px-4 py-2 text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
                  >
                    <Home size={18} className="mr-1.5" />
                    <span className="font-medium">Home</span>
                  </Link>
                </li>

                {category?.map((cData, index) => (
                  <li key={index}>
                    <Popover
                      open={openPopover === cData._id}
                      onOpenChange={(open) => {
                        if (open) {
                          setOpenPopover(cData._id);
                        } else {
                          setOpenPopover(null);
                        }
                      }}
                    >
                      <PopoverTrigger asChild>
                        <button className="flex items-center px-4 py-2 text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200">
                          {cData.children && cData.children.length > 0 ? (
                            <span className="font-medium">{cData.name}</span>
                          ) : (
                            <Link href={`/category/${cData._id}`}>
                              <span className="font-medium">{cData.name}</span>
                            </Link>
                          )}

                          {cData.children && cData.children.length > 0 && (
                            <ChevronDown
                              size={16}
                              className="ml-1.5 opacity-70"
                            />
                          )}
                        </button>
                      </PopoverTrigger>

                      {cData.children && cData.children.length > 0 && (
                        <PopoverContent
                          className="w-auto p-0 rounded-lg shadow-xl border border-gray-100"
                          align="center"
                          sideOffset={8}
                        >
                          <div className="flex flex-row max-w-4xl">
                            {/* Left: Main Category Image */}
                            <div className="flex-shrink-0 w-64 bg-gradient-to-br from-red-50 to-white border-r border-gray-100">
                              <div className="p-6">
                                <div className="flex items-center mb-3">
                                  <Tag
                                    size={16}
                                    className="text-red-600 mr-2"
                                  />
                                  <h3 className="text-base font-bold text-red-600">
                                    {cData.name}
                                  </h3>
                                </div>
                                <div className="relative h-40 w-full rounded-md overflow-hidden shadow-md">
                                  <Image
                                    src={
                                      cData.categoryImage ||
                                      "/images/default.png"
                                    }
                                    alt={cData.name}
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-300"
                                  />
                                </div>
                                {/* <div className="mt-4">
                                  <Link
                                    href={`/category/${cData._id}`}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                                    onClick={() => setOpenPopover(null)}
                                  >
                                    Browse All
                                    <ChevronDown
                                      size={14}
                                      className="ml-1 rotate-270"
                                    />
                                  </Link>
                                </div> */}
                              </div>
                            </div>

                            {/* Right: Subcategories */}
                            <div className="flex-1 p-6">
                              <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b">
                                Subcategories
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-1">
                                {cData?.children.map((subCat) => (
                                  <div key={subCat._id} className="mb-4">
                                    <Link
                                      href={`/category/${subCat._id}`}
                                      className="text-gray-800 font-medium hover:text-red-600 transition-colors block mb-2"
                                      onClick={() => setOpenPopover(null)}
                                    >
                                      {subCat.name}
                                    </Link>
                                    {subCat.children &&
                                      subCat.children.length > 0 && (
                                        <div className="space-y-1.5">
                                          {subCat.children.map((subSub) => (
                                            <Link
                                              key={subSub._id}
                                              href={`/category/${subSub._id}`}
                                              className="block text-sm text-gray-500 hover:text-red-500 hover:translate-x-0.5 transition-all duration-150"
                                              onClick={() =>
                                                setOpenPopover(null)
                                              }
                                            >
                                              {subSub.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      )}
                    </Popover>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile navigation - hidden on desktop */}
        <div className="lg:hidden text-center py-4">
          <p className="text-sm text-gray-500">
            Please view on a larger screen to see the navigation menu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
