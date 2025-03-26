import { Star } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Review = () => {
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
          <p className="text-[14px] mb-[14px]">4 global rating</p>
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
        <div className="col-span-2">
          <h1 className="text-[25px] font-semibold mb-[20px]">Customers say</h1>
          <div className="flex  mb-[10px] ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>akendra</AvatarFallback>
            </Avatar>
            <p className=" ml-[10px] font-semibold ">Akendra</p>
          </div>

          <div className="ml-[6px]">
            <span className="flex mt-[6px] mb-[10px]">
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              <Star size={20} color="red" />
              {/* <Star size={20} color="red" /> */}
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem rem illo aut, deserunt necessitatibus sint
              asperiores assumenda inventore temporibus, nihil totam ab iusto
              sed error dicta officiis commodi! Excepturi atque ratione
              aspernatur consectetur magni aperiam nostrum. Itaque temporibus
              perferendis, illum eos autem voluptatum eveniet corrupti.
              Asperiores incidunt quod aut rem, praesentium distinctio quas
              repellendus laborum debitis, maiores molestiae. Aperiam nobis
              error aliquid asperiores sunt maxime repellendus debitis delectus,
              dignissimos consequuntur cumque commodi possimus, veritatis,
              soluta animi eum nam est vel ad fugit placeat laborum iusto!
              Officiis neque eos deserunt accusamus. Animi nulla error accusamus
              dolore voluptas. Amet earum aliquam voluptas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
