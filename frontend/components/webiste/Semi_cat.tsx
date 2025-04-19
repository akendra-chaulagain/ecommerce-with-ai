"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { axiosInstence } from "@/hooks/axiosInstence";
import { ArrowRight } from "lucide-react";

interface ICategory {
  _id: number;
  name: string;
  categoryImage: string;
  description?: string;
}

const Semi_cat = () => {
  const [category, setCategory] = useState<ICategory[] | null>([]);
  const [error, setError] = useState<boolean>(false);
  console.log(error);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<{ data: ICategory[] }>(
          "/category/home-category"
        );
        setCategory(response.data.data.slice(0, 6)); // Only 6 items
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {category?.length === 0 ? (
        ""
      ) : (
        <section className="py-16 px-4 mx-auto max-w-1xl">
          <div className="text-center mb-12">
            <h1 className="flex justify-center font-semibold text-2xl sm:text-3xl mb-5 tracking-wide text-[#848383]">
              #OUR CATEGORY
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for your
              lifestyle
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {category?.map((categoryData, index) => (
              <Link
                href={`/category/${categoryData._id}`}
                key={index}
                className="group block overflow-hidden relative h-96 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    fill
                    src={categoryData?.categoryImage || "/h2.jpg"}
                    alt={categoryData?.name || "Category Image"}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {categoryData?.name}
                    </h3>
                    <span className="inline-flex items-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="relative h-64 md:h-[350px] overflow-hidden mb-8 rounded-xl">
        <Image
          fill
          src="/h2.jpg"
          alt="Spring Collection 2025"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Spring Collection 2025
            </h1>
            <p className="text-base md:text-xl mb-4">
              Refresh your wardrobe with our latest styles
            </p>
            <button className="bg-white text-black px-6 py-2 font-medium rounded hover:bg-gray-100 transition">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Semi_cat;
