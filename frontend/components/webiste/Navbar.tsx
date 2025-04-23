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

interface ICategory {
  _id: string;
  name: string;
  categoryImage: string;
  children?: ICategory[];
}

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
  console.log(category);
  

  return (
    <div className="mt-[25px] px-[20px] text-[14px] font-bold hidden sm:hidden lg:block">
      <ul className="flex justify-between">
        <Link
          href="/"
          className="cursor-pointer hover:underline hover:text-red-800"
        >
          Home
        </Link>

        {category?.map((cData, index) => (
          <Popover key={index}>
            <PopoverTrigger className="cursor-pointer hover:underline hover:text-red-600 transition-colors">
              {cData.name}
            </PopoverTrigger>

            {cData.children && cData.children.length > 0 && (
              <PopoverContent className="w-[380px] p-0 rounded-xl shadow-lg border-0 z-50">
                <div className="flex">
                  {/* Left: Category Image */}
                  <div className="flex-shrink-0 flex items-center justify-center rounded-l-xl p-4">
                    <Image
                      src={cData.categoryImage || "/images/default.png"}
                      alt={cData.name}
                      width={130}
                      height={150}
                      className="object-cover rounded-lg shadow"
                    />
                  </div>

                  {/* Right: Subcategories */}
                  <div className="flex flex-col justify-center w-full p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {cData.children.map((subCat, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/category/${subCat._id}`}
                          className="block px-3 py-2 rounded-lg text-[15px] font-semibold text-gray-800  hover:text-red-600 transition-colors"
                        >
                          {subCat.name}
                        </Link>
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
