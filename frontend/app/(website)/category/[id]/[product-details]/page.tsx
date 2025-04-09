"use client";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import { iProduct, iReview } from "@/types/types";
import Review from "../../components/Review";
import { useAuth } from "@/context/AuthContext";
import { useNotificationToast } from "@/hooks/toast";

const Page = () => {
  const user = useAuth();
  const userId = user?.user?._id;
  const pathname = usePathname();
  const parts = pathname.split("/");
  // Get the last part (product ID)
  const lastId = parts[parts.length - 1].replace("product-details-", "");
  const [product, setProduct] = useState<iProduct | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const showToast = useNotificationToast(); // Use the custom hook
  console.log(error);

  // get product details
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<iProduct>(
          `review/review_according-to-product/${lastId}${
            userId ? `?userId=${userId}` : " "
          }`
        );

        setProduct(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [lastId, userId]);
  const reviews: iReview[] = product?.reviews ?? [];

  // for product images slider
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );
  // get reting from the child component
  const handleRatingUpdate = (rating: number) => {
    setRating(rating);
  };
  // handle quantiy
  const updateCartQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Ensures quantity doesn't go below 1
  };
  // add to cart
  const handleAddToCart = async () => {
    try {
      const response = await axiosInstence.post(
        "/cart/add-to-cart",
        {
          productId: lastId,
          quantity,
        },
        { withCredentials: true }
      );
      showToast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

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
                {product?.details?.images?.map((data, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <div className="relative w-full h-[70vh]">
                      {" "}
                      <Image
                        src={data}
                        alt="logo"
                        layout="fill"
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
                {product?.details?.name}
              </h1>
              <div className="flex justify-between my-[20px]">
                <span>Style # P251121032</span>
                <div className="flex ml-[6px]">
                  <span className="flex ">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          rating
                            ? index < Math.round(parseFloat(rating.toString())) // Rating available
                              ? "text-red-600 fill-red-600" // Filled star
                              : "text-gray-400 fill-gray-400" // Empty star
                            : "text-gray-400 fill-gray-400" // Default if no rating
                        }`}
                      />
                    ))}
                  </span>
                  {/* <span className="ml-[5px] text-[15px] font-bold">
                    {rating}
                  </span> */}
                  <p className="ml-[5px] text-[14px] font-semibold">
                    ( {reviews?.length} ) Reviews
                  </p>
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
                  <span
                    className="text-[27px] cursor-pointer"
                    onClick={() => updateCartQuantity(-1)}
                  >
                    -
                  </span>
                  <p className="text-[20px] font-semibold">{quantity}</p>{" "}
                  <span
                    className="text-[20px] cursor-pointer"
                    onClick={() => updateCartQuantity(1)}
                  >
                    +
                  </span>
                </div>

                <div className="ml-[20px]">
                  <Button
                    onClick={handleAddToCart}
                    className="bg-red-600 text-white border-2 hover:text-black hover:bg-white px-[40px] py-[25px]"
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>

              <hr />

              {/* description
               */}
              <div className="mt-[20px]">
                <p className="text-[16px]">{product?.details?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Review
        reviews={reviews}
        lastId={lastId}
        sendRatingToParent={handleRatingUpdate}
      />
    </>
  );
};

export default Page;
