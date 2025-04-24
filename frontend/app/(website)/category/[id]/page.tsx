"use client";
import React, { useEffect, useState } from "react";
import Items from "../components/Items";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useParams } from "next/navigation";
import { iCategoryResponse, iColor } from "@/types/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/types";
import LoadingPage from "@/components/webiste/Loading";

interface iFilter {
  name: string;
  values: string[];
}

const Page = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<iCategoryResponse | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorLoading, setColorLoading] = useState<boolean>(false);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [categoryTree, setCategoryTree] = useState<ICategory[]>([]);
  const [colorData, setcolorData] = useState<iColor | null>(null);
  console.log(error);

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

  // get category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstence.get(`/category/${id}`);
        setCategory(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // select color
  const handleColor = async (color: string) => {
    try {
      setColorLoading(true);
      const response = await axiosInstence.get(
        "/product/get-product-according-to-color",
        {
          params: { color, categoryId: id },
        }
      );
      setcolorData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setColorLoading(false);
    }
  };

  const colorname = colorData?.color;

  const [filter, setFilter] = useState<iFilter[] | null>();
  useEffect(() => {
    const getAllColors = async () => {
      try {
        const res = await axiosInstence.get(`/product/get-filter`, {
          withCredentials: true,
        });
        setFilter(res.data.filters);
      } catch (error) {
        console.log(error);
      }
    };
    getAllColors();
  }, []);
  console.log(filter);

  if (loading || colorLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="mt-12 px-4 sm:px-8">
        {/* Category title */}
        <div className="mb-12 text-center">
          <p className="text-gray-400 text-base tracking-wide animate-fade-in">
            {category?.name.toUpperCase()} /
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-gray-800">
            {colorData?.color
              ? colorname?.toUpperCase()
              : category?.name.toUpperCase()}
          </h1>
        </div>

        {/* Filter header */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
              FILTERS
            </h2>
          </div>
          <div className="flex sm:hidden md:hidden lg:flex hidden justify-end items-center">
            <p className="text-gray-500">
              Showing{" "}
              <span className="font-bold text-red-600 mx-2">
                {colorData
                  ? colorData.products.length
                  : category?.products?.length}
              </span>
              items
            </p>
          </div>
        </div>

        {/* Filter panel + Items */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters sidebar */}
          <div className="w-full mb-4 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
            {/* Category Filter */}
            <Collapsible className="border-b">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-all duration-200 hover:text-red-600 rounded-t-2xl">
                <p className="text-lg font-bold text-gray-800 tracking-wide">
                  CATEGORY
                </p>
                <ChevronDown className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover:rotate-180" />
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
                          {data.name}
                        </Link>
                        {data.children?.length > 0 && (
                          <ChevronRight
                            className={`w-4 h-4 text-red-400 transition-transform duration-300 ${
                              openCategories[data._id] ? "rotate-90" : ""
                            }`}
                          />
                        )}
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

            {/* Dynamic Filters */}
            {filter?.map((cData, i) => (
              <React.Fragment key={i}>
                <Collapsible className="border-b">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-all duration-200 hover:text-red-600">
                    <p className="text-lg font-bold text-gray-800 tracking-wide">
                      {cData?.name}
                    </p>
                    <ChevronDown className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-5">
                    <div className="flex flex-col gap-3">
                      {cData?.values?.map((val, idx) => (
                        <button
                          key={idx}
                          className="group flex items-center gap-3 w-full p-3 text-left font-medium text-gray-700 rounded-xl transition-all duration-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                          onClick={() => {
                            if (cData.name.toLowerCase() === "color") {
                              handleColor(val);
                            }
                          }}
                        >
                          {cData.name.toLowerCase() === "color" ? (
                            <span
                              className="w-6 h-6 border border-gray-300 shadow-sm transition-transform duration-200 group-hover:scale-110"
                              style={{
                                backgroundColor:
                                  val.trim().toLowerCase() || "#000",
                              }}
                            />
                          ) : (
                            <span className="text-red-400">•</span>
                          )}
                          <span className="flex-1">{val.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </React.Fragment>
            ))}
          </div>

          {/* Item List */}
          <div className="lg:col-span-4">
            <Items category={category} colorData={colorData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
