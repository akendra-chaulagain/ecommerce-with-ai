"use client";
import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Items from "../components/Items";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useParams } from "next/navigation";
// import Link from "next/link";

// Define your interfaces for products and category
interface iProduct {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  image: string[];
}

interface iCategoryResponse {
  _id: string;
  images: string;
  name: string;
  description: string;
  products: iProduct[];
}

interface ApiResponse {
  message: string;
  products: iCategoryResponse[]; // This is an array of CategoryResponse
}

const Page = () => {
  // const router = useRouter();
  const { id } = useParams();
  const [category, setCategory] = useState<iCategoryResponse | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<ApiResponse>(
          `/category/${id}`
        );
        setCategory(response.data.products[0]);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [id]);

  console.log(category);

  return (
    <>
      <div className="mt-[45px] px-[30px]">
        {/* category name */}
        <p className="flex justify-center text-gray-500">Clothing /</p>
        <h1 className="flex justify-center text-[30px] font-semibold mt-[4px]">
          CLOTHING
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
                Showing <span className="font-bold mx-[5px]"> 2,682 </span>{" "}
                items
              </p>
            </div>

            {/* <div className="sm:hidden  md:hidden lg:block"> */}
          </div>
        </div>

        {/* <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4"> */}
        <div className="grid sm:grid-cols-1 md:grid-cols-1  grid-cols-1 lg:grid-cols-5">
          {/* filter components  */}

          <Filter />

          <Items />
        </div>
      </div>
    </>
  );
};

export default Page;
