"use client";
import React, { useEffect, useState } from "react";
import Items from "../components/Items";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useParams } from "next/navigation";
// import Link from "next/link";
import { iCategoryResponse, iColor } from "@/types/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/types";

const Page = () => {
  // const router = useRouter();
  const { id } = useParams();
  const [category, setCategory] = useState<iCategoryResponse | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [color, setColor] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [categoryTree, setCategoryTree] = useState<ICategory[]>([]);
  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // get category tree
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axiosInstence.get(`/category/tree`, {
          withCredentials: true,
        });
        setCategoryTree(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  //

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get(`/category/${id}`);
        setCategory(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [id]);
  console.log(error);
  // get all color
  useEffect(() => {
    const getAllColors = async () => {
      try {
        const res = await axiosInstence.get(`/product/get-color`, {
          withCredentials: true,
        });
        setColor(res.data.colors);
      } catch (error) {
        console.log(error);
      }
    };
    getAllColors();
  }, []);
  const [colorData, setcolorData] = useState<iColor | null>(null);
  // filter product according to the color
  const handleColor = async (color: string) => {
    try {
      const response = await axiosInstence.get(
        "/product/get-product-according-to-color",
        {
          params: { color, categoryId: id },
        }
      );

      setcolorData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const colorname = colorData?.color.toUpperCase();
  return (
    <>
      <div className="mt-[45px] px-[30px]">
        {/* category name */}
        <p className="flex justify-center text-gray-500">{category?.name} /</p>
        <h1 className="flex justify-center text-[30px] font-semibold mt-[4px]">
          {/* {category?.name} */}
          {colorData?.color ? colorname : category?.name}
        </h1>
        {/* filter section */}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
          <div>
            <h2 className="text-[23px] font-semibold mb-[20px]">FILTERS</h2>
          </div>
          {/* dropdown filter */}
          <div className="flex  sm:hidden  md:hidden lg:block hidden">
            <div className="flex justify-end">
              <p className="flex items-center mr-[10px]">
                Showing{" "}
                <span className="font-bold mx-[5px]">
                  {" "}
                  {category?.products?.length}{" "}
                </span>{" "}
                items
              </p>
            </div>
          </div>
        </div>

        {/* <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4"> */}
        <div className="grid sm:grid-cols-1 md:grid-cols-1  grid-cols-1 lg:grid-cols-5">
          {/* filter components  */}
          <div className="w-full mb-4 border rounded-2xl shadow-lg bg-white">
            {/* Category Filter */}
            <Collapsible className="border-b">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-red-50 rounded-t-2xl transition">
                <p className="text-lg font-bold text-gray-700 tracking-wide hover:text-red-600">
                  CATEGORY
                </p>
                <ChevronDown className="w-5 h-5 text-red-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-5">
                <div className="flex flex-col space-y-4 text-base">
                  {categoryTree.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => toggleCategory(data._id)}
                      >
                        <Link
                          className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors"
                          href="#"
                        >
                          {data.name.toUpperCase()}
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
                                • {child.name.toUpperCase()}
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
                <div className="flex flex-col gap-3 text-base">
                  {color?.map((cData, i) => (
                    <div
                      onClick={() => handleColor(cData)}
                      className="flex items-center gap-3 bg-gray-50 hover:bg-red-50 rounded-lg px-3 py-2 transition cursor-pointer group"
                      key={i}
                    >
                      <span
                        className="w-6 h-6 border-2 border-gray-200 shadow-sm"
                        style={{
                          backgroundColor: cData.trim().toLowerCase() || "#000",
                        }}
                      ></span>
                      <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
                        {cData.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <Items category={category} colorData={colorData} />
        </div>
      </div>
    </>
  );
};

export default Page;
