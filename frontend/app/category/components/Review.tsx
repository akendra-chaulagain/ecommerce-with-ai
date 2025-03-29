// "use client";
import { Star } from "lucide-react";
import React, { useState } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

interface ReviewProps {
  reviews: iReview[];
  lastId: number;
}

const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return "0.0"; // Avoid division by zero
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place
};

const Review: React.FC<ReviewProps> = ({ reviews, lastId }) => {
  const showToast = useNotificationToast(); // Use the custom hook
  const averateRating = calculateAverageRating(reviews);
  // for rating

  const [isStarred, setIsStarred] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // log add review
  const user = useAuth();
  const [ratingNum, setRatingNum] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const userId = user?.user?._id;

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    const reviewData = {
      user: userId,
      product: lastId,
      rating: ratingNum,
      comment,
    };

    try {
      const addReview = await axiosInstence.post(
        "/review/add-review",
        reviewData,
        {
          withCredentials: true,
        }
      );
      showToast(addReview.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  const clickStaredButton = (index: number) => {
    setRatingNum(index + 1); // Update the rating
    const updatedStars = isStarred.map((_, i) => i <= index); // All stars before and including the clicked one should be true
    setIsStarred(updatedStars); // Update star states
    setRatingNum(index + 1); // Update ratingNum based on star clicked
  };

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

            {/* add review dialog */}

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
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      name="comment"
                      className="w-full h-[30vh] border border-gray-700 p-2 rounded-md text-[17px] text-black"
                    ></textarea>
                    {error && (
                      <p className="text-red-600 mt-2 text-[15px]">{error}</p>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <span className="flex mt-[6px] mb-[10px]">
                    {isStarred.map((isStarred, index) => (
                      <Star
                        key={index}
                        name="rating"
                        className="cursor-pointer transition-all"
                        size={25}
                        color={isStarred ? "black" : "red"}
                        onClick={() => {
                          clickStaredButton(index);
                          setRatingNum(index + 1);
                        }}
                      />
                    ))}

                    {/* <Star size={20} color="red" /> */}
                  </span>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleAddReview}
                    className="bg-red-600 text-white text-[15px] mt-[10px] hover:bg-slate-100 hover:text-black"
                  >
                    {/* Add Review */}
                    {loading ? "Loading..." : "Review Added"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* end add review  */}
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
