import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDown,  ChevronRight } from "lucide-react";
import { axiosInstence } from "@/hooks/axiosInstence";
import { ICategory } from "@/types/types";

const Filter = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  // get all category
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

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // get all products for the products

  return (
    <>
      <div className="w-full mb-4 border rounded-2xl shadow-lg bg-white">
        {/* Category Filter */}
        <Collapsible className="border-b" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-red-50 rounded-t-2xl transition">
            <p className="text-lg font-bold text-gray-700 tracking-wide hover:text-red-600">
              CATEGORY
            </p>
            <ChevronDown className="w-5 h-5 text-red-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-5">
            <div className="flex flex-col space-y-4 text-base">
              {category.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleCategory(data._id)}
                  >
                    <Link
                      className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors"
                      href="#"
                    >
                      {data.name}
                    </Link>
                    {data.children?.length > 0 ? (
                      <ChevronRight
                        className={`w-4 h-4 text-red-400 transition-transform ${
                          openCategories[data._id] ? "rotate-90" : ""
                        }`}
                      />
                    ) : null}
                  </div>
                  {(openCategories[data._id] || false) &&
                    data?.children?.length > 0 && (
                      <div className="pl-4 space-y-2 border-l-2 border-red-100">
                        {data?.children?.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            className="block font-medium text-gray-600 hover:text-red-600 transition-colors"
                            href={`/category/${child._id}`}
                          >
                            • {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Colors Filter */}
        <Collapsible className="border-b">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-red-50 transition">
            <p className="text-lg font-bold text-gray-700 tracking-wide hover:text-red-600">
              COLORS
            </p>
            <ChevronDown className="w-5 h-5 text-red-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-5">
            <div className="flex flex-col space-y-3 text-base">
              <div className="space-y-2">
                <div className="flex items-center justify-between cursor-pointer">
                  <Link
                    className="font-semibold text-gray-800 hover:text-red-600 transition-colors"
                    href="/"
                  >
                    View All
                  </Link>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </div>
                <div className="pl-4 space-y-2 border-l-2 border-red-100">
                  <Link
                    className="block font-medium text-gray-600 hover:text-red-600 transition-colors"
                    href="/"
                  >
                    New Arrivals
                  </Link>
                  <Link
                    className="block font-medium text-gray-600 hover:text-red-600 transition-colors"
                    href="/"
                  >
                    Best Sellers
                  </Link>
                  <Link
                    className="block font-medium text-gray-600 hover:text-red-600 transition-colors"
                    href="/"
                  >
                    Sale Items
                  </Link>
                </div>
              </div>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Sweaters
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Blouses and Shirts
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Pants
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Jeans
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Jackets and Coats
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Sleepwear
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Intimates
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Suiting
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Dresses
              </Link>
              <Link
                className="font-medium text-gray-600 hover:text-red-600 transition-colors"
                href="/"
              >
                Shoes
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

export default Filter;
