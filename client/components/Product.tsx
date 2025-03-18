"use client";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import Category from "../category.json";
import { Button } from "./ui/button";

const Product = () => {
  return (
    <>
      <div className="mt-[100px] mb-[40px] ">
        <h1 className="flex justify-center font-semibold text-[27px] mb-[20px] tracking-wide text-[#adb5bd]">
          #OUR PRODUCTS
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Category.map((data) => (
            <div
              key={data.id}
              className="cursor-pointer border-2 border-[#f2f2f2] p-4 rounded "
            >
              <Image
                src={data.photo}
                alt="logo"
                width={700}
                height={100}
                className=" flex justify-center object-fill cursor-pointer "
              />
              <h3 className="font-semibold text-[21px] text-red-600 ml-[6px]">
                ${data.price}
              </h3>
              <p className="text-[16px] ml-[6px]">{data.p}</p>
              <div className="flex ml-[6px]">
                <span className="flex mt-[6px] mb-[10px]">
                  <Star size={15} color="red" />
                  <Star size={15} color="red" />
                  <Star size={15} color="red" />
                  <Star size={15} color="red" />
                  <Star size={15} color="red" />
                </span>
                <span className="ml-[5px]">23</span>
              </div>

              <Button
                variant="outline"
                className="bg-red-600 text-white text-[15px] mt-[10px]"
              >
                Add to Cart <ShoppingCart size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
