"use client";
import Image from "next/image";
import React from "react";
import product from "../product.json";
import Slider from "react-slick";

const Homeslider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
      <div className="mt-[60px]">
        <div>
          <h1 className="flex justify-center font-semibold text-[27px] mb-[5px] tracking-wide text-[#adb5bd]">
            #MYTALBOTS
          </h1>
          <p className="flex justify-center text-[17px] mb-[20px]">
            Follow us on Instagram @talbotsofficial for outfit inspiration and
            fun style tips.
          </p>
        </div>
        {/* <div>grid grid-cols-3</div> */}
        <Slider {...settings}>
          {product.map((data) => (
            <div
              key={data.id}
              className=" cursor-pointer border-2 border-[#f2f2f2] p-4 rounded "
            >
              <Image
                src={data.photo}
                alt="logo"
                width={300}
                height={100}
                className="  object-fill cursor-pointer ml-[6px]"
              />

              <p className="text-[17px] ml-[6px]">{data.p}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Homeslider;
