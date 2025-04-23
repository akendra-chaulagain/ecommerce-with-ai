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
const Navbar = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const getAllCategories = async () => {
    try {
      const res = await axiosInstence.get(`/category/tree`, {
        withCredentials: true,
      });
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="mt-8 px-8 text-[15px] font-semibold hidden sm:hidden lg:block">
      <ul className="flex justify-between gap-8 items-center">
        <Link
          href="/"
          className="cursor-pointer hover:underline hover:text-red-700 transition-colors"
        >
          Home
        </Link>
        {category?.map((cData, index) => (
          <Popover key={index}>
            <PopoverTrigger className="cursor-pointer hover:underline hover:text-red-700 transition-colors">
              {cData.name}
            </PopoverTrigger>
            {cData.children && cData.children.length > 0 && (
              <PopoverContent className="w-auto px-10 py-15 rounded-xl shadow-2xl border-0  bg-white">
                <div className="flex">
                  {/* Left: Main Category Image */}
                  <div className="flex-shrink-0 flex items-center justify-center p-4 border-r border-gray-100 bg-red-50 rounded-l-xl">
                    <Image
                      src={cData.categoryImage || "/images/default.png"}
                      alt={cData.name}
                      width={200}
                      height={130}
                      className="object-cover rounded-lg shadow"
                    />
                  </div>
                  {/* Right: Subcategories */}
                  <div className="flex flex-col w-full p-4">
                    <h3 className="text-base font-bold text-red-600 mb-3">
                      Subcategories
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6">
                      {[0, 1].map((colIndex) => (
                        <div key={colIndex} className="space-y-3">
                          {cData?.children
                            .slice(colIndex * 5, colIndex * 5 + 5)
                            .map((subCat) => (
                              <div key={subCat._id}>
                                <Link
                                  href={`/category/${subCat._id}`}
                                  className="text-gray-800  hover:text-red-600 transition-colors "
                                >
                                  {subCat.name}
                                </Link>
                                {subCat.children &&
                                  subCat.children.length > 0 && (
                                    <div className="pl-3 mt-1 space-y-1">
                                      {subCat.children.map((subSub) => (
                                        <Link
                                          key={subSub._id}
                                          href={`/category/${subSub._id}`}
                                          className="block text-sm text-gray-500 hover:text-red-500"
                                        >
                                          {subSub.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            )}
          </Popover>
        ))}
      </ul>
    </div>
  );
};
export default Navbar;