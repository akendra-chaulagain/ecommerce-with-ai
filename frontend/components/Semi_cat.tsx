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

        if (Array.isArray(response.data.data)) {
          setCategory(response.data.data);
        } else {
          throw new Error("Invalid category data format");
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, pariatur? */}

      {category?.length === 0 ? (
        ""
      ) : (
        <>
          <section className="py-16 px-6  mx-auto">
            <div className="text-center mb-12">
              <h1 className="flex justify-center font-semibold text-[30px] mb-[20px] tracking-wide text-[#848383]">
                #OUR CATEGORY
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our carefully curated collections designed for your
                lifestyle
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {category?.map((category, index) => (
                <Link
                  href={`/category/${category._id}`}
                  key={index}
                  className="group block overflow-hidden relative h-96 rounded"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={category.categoryImage}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.name}
                      </h3>
                      <span className="inline-flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
        </>
      )}
    </>
  );
};

export default Semi_cat;
