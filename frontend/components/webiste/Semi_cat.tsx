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
  // console.log(category);

  return (
    <>
      {category?.length === 0 ? (
        ""
      ) : (
        <section className="py-12 px-4 sm:px-6 lg:px-10 max-w-1xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide text-[#555] mb-3">
              #OUR CATEGORY
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for your
              lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {category?.map((cat, i) => (
              <Link
                href={`/category/${cat._id}`}
                key={i}
                className="group relative h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    src={cat.categoryImage || "/h2.jpg"}
                    alt={cat.name || "Category Image"}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-3">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                      {cat.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-white font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center">
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
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
          src="/images/trend.webp"
          alt="Spring Collection 2025"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Spring Collection 2025
            </h1>
            <p className="text-base md:text-xl mb-4">
              Refresh your wardrobe with our latest styles
            </p>
            <Link href={"/products"}>
              <button className="bg-red-600 text-white px-6 py-2 font-medium rounded hover:bg-white hover:text-black transition">
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Semi_cat;
