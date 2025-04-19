"use client";
import Image from "next/image";
import React from "react";
import product from "../../product.json";
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
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
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
    <div className="mt-12 px-2 sm:px-4">
      <div className="mb-8 text-center">
        <h1 className="font-semibold text-2xl sm:text-3xl tracking-wide text-[#adb5bd] mb-2">
          #MYTALBOTS
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Follow us on Instagram for outfit inspiration and fun style tips.
        </p>
      </div>
      <Slider {...settings}>
        {product.map((data) => (
          <div key={data.id} className="group px-2 sm:px-3">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={data.photo}
                  alt={data.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 20vw"
                  priority={data.id === 1}
                />
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform z-10">
                <button className="w-full bg-black/90 text-white py-3 font-medium flex items-center justify-center rounded-b-2xl">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-2xl" />
            </div>
            <div className="mt-4 px-1">
              <h3 className="font-semibold text-base sm:text-lg truncate">
                {data.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-red-600">${data.price}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Homeslider;
