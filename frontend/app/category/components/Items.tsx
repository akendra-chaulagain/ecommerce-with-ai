
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import Category from "@/category.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Link from "next/link";

const Items = () => {
  return (
    <>
      <div className="grid col-span-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ml-[10px]">
        {/* <Link href='/category/1'>
        </Link> */}
        {Category.map((data) => (
          <div
            key={data.id}
            className="cursor-pointer border-2 border-[#f2f2f2] p-4 rounded "
          >
            <Link href="/category/1">
              <Image
                src={data.photo}
                alt="logo"
                width={300}
                height={100}
                className=" object-fill cursor-pointer ml-[6px]"
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
            </Link>

            <Button
              variant="outline"
              className="bg-red-600 text-white text-[15px] mt-[10px]"
            >
              Add to Cart <ShoppingCart size={16} />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Items;
