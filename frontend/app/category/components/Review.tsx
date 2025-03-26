"use client";
import { Star } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Review = ({ review }) => {

  return (
    <>
      <div className="mt-[45px] mb-[40px]">
        <hr />
        <h1 className="text-[30px] font-semibold mt-[45px]">
          {" "}
          Looking for Customers Review ?
        </h1>
      </div>
      {/* grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 */}
      <div className="grid grid-cols-3 gap-8">
        <div className="">
          <hr />

          <h1 className="text-[25px] font-semibold">Customer reviews</h1>
          <div className="flex ml-[6px]">
            <span className="flex mt-[6px] mb-[10px]">
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              {/* <Star size={20} color="red" /> */}
            </span>
            <span className="ml-[5px] text-[20px]">4 out of 5</span>
            <br />
          </div>
          <p className="text-[14px] mb-[14px]">{review.length} global rating</p>
          <hr />
          <div className="mt-[14px] leading-[2.3]">
            <h1 className="text-[25px] font-semibold">Review this product</h1>
            <p className="text-[18px] font-semibold">
              Share your thoughts with other customers
            </p>
            <Button
              variant="outline"
              className="bg-red-600 text-white text-[15px] mt-[10px]"
            >
              Write a customer review
            </Button>
          </div>
        </div>
        {/* {review.map((index,))} */}
        <div className="col-span-2">
          <h1 className="text-[25px] font-semibold mb-[20px]">Customers say</h1>
          {review?.map((data, index) => (
            <div key={index} className="mt-[20px]">
              <div className="flex  mb-[10px] ">
                <Avatar>
                  <AvatarImage
                    src={data.userDetails.avtar}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{data.userDetails.rating}</AvatarFallback>
                </Avatar>
                <p className=" ml-[10px] font-semibold ">
                  {data.userDetails.name}
                </p>
              </div>

              <div className="ml-[6px]">
                <span className="flex mt-[6px] mb-[10px]">
                  <Star size={20} color="red" />
                  <Star size={20} color="red" />
                  <Star size={20} color="red" />
                  <Star size={20} color="red" />
                  {/* <Star size={20} color="red" /> */}
                </span>
                <p>{data.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Review;
