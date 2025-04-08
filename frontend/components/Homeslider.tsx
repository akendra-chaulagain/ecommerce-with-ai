"use client";
import Image from "next/image";
import React from "react";
import product from "../product.json";
import Slider from "react-slick";
import { Eye, ShoppingCart, Star } from "lucide-react";

const Homeslider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-[50px]">
        <div>
          <h1 className="flex justify-center font-semibold text-[27px]  tracking-wide text-[#adb5bd]">
            #MYTALBOTS
          </h1>
          <p className="flex justify-center text-[17px] mb-[20px]">
            Follow us on Instagram for outfit inspiration and fun style tips.
          </p>
        </div>
        {/* <div>grid grid-cols-3</div> */}
        <Slider {...settings}>
          {product.map((data) => (
            <div key={data.id} className="group px-3">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={data.photo}
                    alt={data.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Quick view"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform">
                  <button className="w-full bg-black text-white py-3 font-medium flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-lg">{data.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">${data.price}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
  
    

    </>
  );
};

export default Homeslider;
