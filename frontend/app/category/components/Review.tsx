// "use client";
import { Star } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { iReview } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReviewProps {
  reviews: iReview[];
}

const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return "0.0"; // Avoid division by zero
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place
};

const Review: React.FC<ReviewProps> = ({ reviews }) => {
  const averateRating = calculateAverageRating(reviews);
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
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  color={
                    index < Math.round(parseFloat(averateRating))
                      ? "red "
                      : "gray"
                  }
                />
              ))}
              {/* <Star size={20} color="red" /> */}
            </span>
            <span className="ml-[5px] text-[20px]">
              {averateRating} out of 5
            </span>
            <br />
          </div>
          <p className="text-[14px] mb-[14px]">
            {reviews.length} global rating
          </p>
          <hr />
          <div className="mt-[14px] leading-[2.3]">
            <h1 className="text-[25px] font-semibold">Review this product</h1>
            <p className="text-[18px] font-semibold">
              Share your thoughts with other customers
            </p>

            {/*  */}

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-red-600 text-white text-[15px] mt-[10px]"
                >
                  Write a customer review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                  <DialogTitle className="text-[25px] mb[20px]">
                    Add Review
                  </DialogTitle>
                  <DialogDescription>
                    <textarea className="w-full h-[30vh] border border-gray-700 p-2 rounded-md text-[17px] text-black"></textarea>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <span className="flex mt-[6px] mb-[10px]">
                    <Star
                      className="cursor-pointer transition-all"
                      size={25}
                      color="red"
                    />
                    <Star
                      className="cursor-pointer transition-all"
                      size={25}
                      color="red"
                    />
                    <Star
                      className="cursor-pointer transition-all"
                      size={25}
                      color="red"
                    />
                    <Star
                      className="cursor-pointer transition-all"
                      size={25}
                      color="red"
                    />
                    <Star
                      className="cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded-full transition-all"
                      size={40}
                      color="black"
                    />

                    {/* <Star size={20} color="red" /> */}
                  </span>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-red-600 text-white text-[15px] mt-[10px] hover:bg-slate-100 hover:text-black"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* {reviews.map((data,index))} */}
        <div className="col-span-2">
          <h1 className="text-[25px] font-semibold mb-[20px]">Customers say</h1>
          {reviews?.map((data, index) => (
            <div className="mt-[20px]" key={index}>
              <div className="flex  mb-[10px] ">
                <Avatar>
                  <AvatarImage src={data.userDetails?.avtar} alt="@shadcn" />
                  <AvatarFallback>{data.userDetails?.rating}</AvatarFallback>
                </Avatar>
                <p className=" ml-[10px] font-semibold ">
                  {data.userDetails?.name}
                </p>
              </div>

              <div className="ml-[6px]">
                <span className="flex mt-[6px] mb-[10px]">
                  <span className="flex mt-[6px] mb-[10px]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={20}
                        color={starIndex < data.rating ? "red" : "gray"}
                      />
                    ))}
                  </span>
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
