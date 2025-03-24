"use client";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import Category from "@/category.json";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { axiosInstence } from "@/hooks/axiosInstence";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface iProduct {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface apiResponse {
  message: string;
  data: iProduct;
}

const Page = () => {
  // const router = useRouter()
  // const {productId} = router.query
  // console.log(productId);

  const pathname = usePathname();
  const parts = pathname.split("/");
  // Get the last part (product ID)
  const lastId = parts[parts.length - 1].replace("product-details-", "");

  const [product, setproduct] = useState<iProduct | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<apiResponse>(
          `product/product-details/${lastId}`
        );
        setproduct(response.data.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [lastId]);

  console.log(product);

  // for images
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

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
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              // opts={{ dots: true }}
              className="relative w-[80%] h-[70vh]"
            >
              <CarouselContent>
                {product?.images.map((data, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <div className="relative w-full h-[70vh]">
                      {" "}
                      <Image
                        src={data}
                        alt="logo"
                        layout="fill"
                        // width={400}
                        // height={100}
                        // className=" h-[70vh] cursor-pointer"
                        objectFit="cover"
                        className="cursor-pointer"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* product Details */}

            <div>
              <h1 className="text-[25px] font-bold flex justify-center mb-[18px]    ">
                {product?.name}
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
                <p className="text-[16px]">{product?.description}</p>
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

export default Page;
