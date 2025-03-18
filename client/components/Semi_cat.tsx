"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { axiosInstence } from "@/hooks/axiosInstence";

interface ICategory {
  name: string;
  categoryImage: string;
  description?: string;
}

const Semi_cat = () => {
  // <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  const [category, setCategory] = useState<ICategory[] | null>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<{ data: ICategory[] }>(
          "/category/home-categorys"
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
        <div className="mt-[50px] ">
          <h1 className="flex justify-center font-semibold text-[30px] mb-[20px] tracking-wide text-[#848383]">
            #OUR CATEGORY
          </h1>
          <div className="grid grid-cols-2 mt-[25px] gap-4   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {category?.map((item: ICategory, index) => (
              <div key={index} className="sm:mb-[20px] md:mb-[20px] mb-[20px]">
                <Link href={"/category"}>
                  <Image
                    src={item.categoryImage}
                    alt="logo"
                    width={400}
                    height={0}
                    className=" w-full h-full object-cover cursor-pointer "
                  />

                  <span
                    className="flex justify-center font-bold underline mt-[6px]
          cursor-pointer hover:text-red-800  "
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Semi_cat;
