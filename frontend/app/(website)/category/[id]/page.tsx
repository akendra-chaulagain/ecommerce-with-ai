// help

"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { ICategory } from "@/types/types";
import LoadingPage from "@/components/webiste/Loading";

interface iFilter {
  name: string;
  values: string[];
}

interface iSelectedFilters {
  color: string | null;
  size: string | null;
  brand: string | null;
  material: string | null;
  [key: string]: string | null;
}

const Page = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<iCategoryResponse | null>(null);
  const [error, setError] = useState<boolean>(false);
  console.log(error);

  const [loading, setLoading] = useState<boolean>(true);
  const [colorLoading, setColorLoading] = useState<boolean>(false);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [categoryTree, setCategoryTree] = useState<ICategory[]>([]);
  const [colorData, setcolorData] = useState<iColor | null>(null);

  // State to track which filter dropdowns are open
  const [openFilterSections, setOpenFilterSections] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleFilterSection = (sectionName: string) => {
    setOpenFilterSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
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
  const [selectedFilters, setSelectedFilters] = useState<iSelectedFilters>({
    color: null,
    size: null,
    brand: null,
    material: null,
  });

  // Active filter badges
  const activeFilters = Object.entries(selectedFilters).filter(
    ([, value]) => value !== null
  );

  const clearFilter = (filterType: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: null,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      color: null,
      size: null,
      brand: null,
      material: null,
    });
  };

  // Automatically open filter sections when they have active filters
  useEffect(() => {
    const newOpenSections = { ...openFilterSections };

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== null) {
        newOpenSections[key] = true;
      }
    });

    setOpenFilterSections(newOpenSections);
  }, [selectedFilters]);
  const fetchFilteredProducts = useCallback(async () => {
    try {
      if (
        selectedFilters.color ||
        selectedFilters.size ||
        selectedFilters.brand ||
        selectedFilters.material
      ) {
        setColorLoading(true);
        const { color, size, brand, material } = selectedFilters;
        const response = await axiosInstence.get("/product/filter", {
          params: {
            categoryId: id,
            color,
            size,
            brand,
            material,
          },
        });
        setcolorData(response.data);
      } else {
        setcolorData(null); // Reset when no filters are selected
      }
    } catch (err) {
      console.error(err);
    } finally {
      setColorLoading(false);
    }
  }, [selectedFilters, id]); // Ensure these dependencies are only those that need to trigger the effect

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedFilters, id, fetchFilteredProducts]);

  // function to get all filter option
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

  if (loading || colorLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto mt-8 px-4 sm:px-8 pb-16">
        {/* Category title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {category?.name.toUpperCase()}
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium {category?.name.toLowerCase()}{" "}
            designed for style and comfort.
          </p>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
              {activeFilters.map(([type, value]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  <span className="capitalize">
                    {type}: {value}
                  </span>
                  <button
                    onClick={() => clearFilter(type)}
                    className="hover:bg-red-100 rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Filter panel + Items */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters sidebar */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <h2 className="text-lg font-bold tracking-wide flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  REFINE YOUR SEARCH
                </h2>
                <p className="text-sm text-red-100 mt-1">
                  {colorData
                    ? `${colorData.products.length} products found`
                    : category?.products?.length
                    ? `${category.products.length} products found`
                    : "No products found"}
                </p>
              </div>

              {/* Category Filter */}
              <Collapsible
                className="border-b border-gray-100"
                open={openFilterSections["category"] || false}
                onOpenChange={() => toggleFilterSection("category")}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 transition-all duration-200 hover:bg-gray-50">
                  <p className="text-base font-semibold text-gray-800">
                    CATEGORY
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openFilterSections["category"] ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="flex flex-col space-y-3 text-base">
                    {categoryTree.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => toggleCategory(data._id)}
                        >
                          <Link
                            className="font-medium text-gray-700 group-hover:text-red-600 transition-colors"
                            href={`#`}
                          >
                            {data.name}
                          </Link>
                          {data.children?.length > 0 && (
                            <ChevronRight
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
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
                                  className="block text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
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
              {filter?.map((cData, i) => {
                const filterType = cData.name.toLowerCase();
                const isFilterActive = selectedFilters[filterType] !== null;

                return (
                  <React.Fragment key={i}>
                    <Collapsible
                      className="border-b border-gray-100"
                      open={openFilterSections[filterType] || false}
                      onOpenChange={() => toggleFilterSection(filterType)}
                    >
                      <CollapsibleTrigger
                        className={`flex items-center justify-between w-full p-4 transition-all duration-200 hover:bg-gray-50 ${
                          isFilterActive ? "bg-white-50" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <p className="text-base font-semibold text-gray-800">
                            {cData?.name.toUpperCase()}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                            openFilterSections[filterType] ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <div className="flex flex-col gap-2">
                          {cData?.values?.map((val, idx) => (
                            <button
                              key={idx}
                              className={`group flex items-center gap-3 w-full p-2 text-left text-sm font-medium rounded-lg transition-all duration-200 ${
                                selectedFilters[cData.name.toLowerCase()] ===
                                val
                                  ? "bg-red-50 text-red-700"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                if (
                                  [
                                    "color",
                                    "size",
                                    "brand",
                                    "material",
                                  ].includes(filterType)
                                ) {
                                  // Toggle filter on/off
                                  setSelectedFilters((prev) => ({
                                    ...prev,
                                    [filterType]:
                                      prev[filterType] === val ? null : val,
                                  }));
                                }
                              }}
                            >
                              {cData.name.toLowerCase() === "color" ? (
                                <span
                                  className={`w-6 h-6 rounded-full border ${
                                    selectedFilters.color === val
                                      ? "ring-2 ring-red-400 ring-offset-1"
                                      : "border-gray-300"
                                  } shadow-sm transition-transform duration-200 group-hover:scale-110`}
                                  style={{
                                    backgroundColor:
                                      val.trim().toLowerCase() || "#000",
                                  }}
                                />
                              ) : (
                                <span
                                  className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                                    selectedFilters[
                                      cData.name.toLowerCase()
                                    ] === val
                                      ? "bg-red-600 border-red-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {selectedFilters[cData.name.toLowerCase()] ===
                                    val && (
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </span>
                              )}
                              <span className="flex-1">{val}</span>
                              {selectedFilters[cData.name.toLowerCase()] ===
                                val && (
                                <span className="text-xs font-normal text-red-600">
                                  Selected
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Item List */}
          <div className="lg:col-span-4">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {Object.values(selectedFilters).some((value) => value !== null)
                  ? "FILTERED PRODUCTS"
                  : "ALL PRODUCTS"}
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing </span>
                <span className="font-bold text-red-600 mx-1">
                  {colorData
                    ? colorData.products.length
                    : category?.products?.length || 0}
                </span>
                <span>items</span>
              </div>
            </div>
            <Items category={category} colorData={colorData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
