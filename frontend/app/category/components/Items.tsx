import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Link from "next/link";

interface iProduct {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface iCategoryResponse {
  _id: string;
  categoryImage: string;
  name: string;
  description: string;
  products: iProduct[];
}

interface ItemsProps {
  category: iCategoryResponse | null;
}

const Items = ({ category }: ItemsProps) => {
  return (
    <>
      <div className="grid col-span-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ml-[10px]">
        {/* <Link href='/category/1'>
        </Link> */}
        {category?.products?.map((data: iProduct, index) => (
          <div
            key={index}
            className="cursor-pointer border-2 border-[#f2f2f2] p-4 rounded "
          >
            <Link
              href={`/category/${category._id}/product-details-${data._id}`}
            >
              <Image
                src={data.images[0]}
                alt="logo"
                width={300}
                height={100}
                className=" object-fill cursor-pointer ml-[6px]"
              />
              <h3 className="font-semibold text-[21px] text-red-600 ml-[6px]">
                ${data.price}
              </h3>
              <p className="text-[16px] ml-[6px]">{data.description}</p>
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
