"use state";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

import Category from "@/category.json";
// import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="mt-[30px]">
        {/* navigator */}
        <div className="flex justify-start items-center">
          <ChevronRight />
          <span className="text-[14px] font-semibold">
            Clothing / Clothes / Clothes Details
          </span>
        </div>

        {/* details grid */}

        <div className="mt-[25px]">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src="/pd.webp"
                alt="logo"
                width={400}
                height={100}
                className=" h-[70vh] cursor-pointer"
              />
            </div>

            {/* product Details */}

            <div>
              <h1 className="text-[25px] font-bold flex justify-center mb-[18px]    ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                sit similique corrupti eius soluta sunt optio repudiandae
                repellat quisquam alias? Sed officia nemo perferendis.
              </h1>
              <div className="flex justify-between my-[20px]">
                <span>Style # P251121032</span>
                <div className="flex ml-[6px]">
                  <span className="flex mt-[6px] mb-[10px]">
                    <Star size={14} color="red" />
                    <Star size={14} color="red" />
                    <Star size={14} color="red" />
                    <Star size={14} color="red" />
                    <Star size={14} color="red" />
                  </span>
                  <span className="ml-[5px] text-[14px]">
                    5.0(3) write a review
                  </span>
                </div>
              </div>
              <hr />

              {/* color type */}
              <div className="my-[20px]">
                <h1 className="text-[20px]">
                  COLOR: <span className="font-semibold"> BLUE ICE</span>
                </h1>
              </div>
              <hr />
              {/* size */}
              <div className="my-[20px]">
                <h1 className="text-[20px] mb-[10px]">SIZE</h1>
                <div className="flex gap-2">
                  <Button className="bg-white text-black border-2 hover:text-white">
                    S
                  </Button>
                  <Button className="bg-white text-black border-2 hover:text-white">
                    X
                  </Button>
                  <Button className="bg-white text-black border-2 hover:text-white">
                    XL
                  </Button>
                  <Button className="bg-white text-black border-2 hover:text-white">
                    XXL
                  </Button>
                  <Button className="bg-white text-black border-2 hover:text-white">
                    XXXL
                  </Button>
                </div>
              </div>
              <hr />
              {/* add to bag */}
              <div className="flex my-[20px]">
                <div className="flex items-center gap-6 border-2 px-[16px] py-[3px]">
                  <span className="text-[27px] cursor-pointer">-</span>
                  <p className="text-[20px] font-semibold">1</p>{" "}
                  <span className="text-[20px] cursor-pointer">+</span>
                </div>

                <div className="ml-[20px]">
                  <Button className="bg-red-600 text-white border-2 hover:text-black hover:bg-white px-[40px] py-[25px]">
                    ADD TO CART
                  </Button>
                </div>
              </div>

              <hr />

              {/* description
               */}
              <div className="mt-[20px]">
                <p className="text-[16px]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quaerat enim cum aperiam eaque. Iste optio maxime obcaecati
                  nemo at, amet veniam nisi nihil quia. Quisquam incidunt magni
                  quae inventore quidem sed neque debitis molestiae optio
                  excepturi dolorum explicabo voluptas ullam quaerat aliquid
                  consequuntur vero nesciunt, cumque officia, dolor aperiam
                  sapiente deleniti? Deleniti corporis ipsam omnis voluptates,
                  rerum reiciendis mollitia culpa autem blanditiis assumenda,
                  qui porro dolorem, in exercitationem fuga quae id cumque
                  beatae? Ducimus quas provident, modi facilis corporis tempore
                  est exercitationem sint esse repellendus incidunt, perferendis
                  unde. Reiciendis nisi, excepturi ratione reprehenderit
                  pariatur at corporis voluptates cupiditate sunt accusantium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  suggestion*/}
      <div className="mt-[40px]">
        <h1 className="flex justify-center font-semibold text-[30px] mb-[20px] tracking-wide text-[#848383]">
          #You Might Also Like
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

export default page;
