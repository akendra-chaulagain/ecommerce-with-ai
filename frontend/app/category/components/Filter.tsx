import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

const Filter = () => {
  // div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"></div>
  return (
    <>
      <div className=" mr-[25px] w-full mb-[10px]">
        <hr />
        <Collapsible>
          <CollapsibleTrigger className=" py-[14px]">
            <p className=" text-[15px] font-semibold  hover:text-red-800">
              CATEGORY
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col text-[16px] mb-[5px] gap-3 ">
            <Link className=" hover:text-red-800" href="/">
              View All{" "}
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sweaters
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Blouses and Shirts
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Pants
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jeans
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jackets and Coats
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sleepwear
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Intimates
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Suiting
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Dresses
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Shoes
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <hr />

        <Collapsible>
          <CollapsibleTrigger className=" py-[14px]">
            <p className=" text-[15px] font-semibold  hover:text-red-800">
              COLLECTIONS
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col text-[16px] mb-[5px] gap-3 ">
            <Link className=" hover:text-red-800" href="/">
              View All{" "}
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sweaters
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Blouses and Shirts
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Pants
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jeans
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jackets and Coats
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sleepwear
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Intimates
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Suiting
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Dresses
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Shoes
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <hr />
        <Collapsible>
          <CollapsibleTrigger className=" py-[14px]">
            <p className=" text-[15px] font-semibold  hover:text-red-800">
              COLORS
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col text-[16px] mb-[5px] gap-3 ">
            <Link className=" hover:text-red-800" href="/">
              View All{" "}
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sweaters
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Blouses and Shirts
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Pants
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jeans
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jackets and Coats
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sleepwear
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Intimates
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Suiting
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Dresses
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Shoes
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <hr />
        <Collapsible>
          <CollapsibleTrigger className=" py-[14px]">
            <p className=" text-[15px] font-semibold  hover:text-red-800">
              FIT & SIZE
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col text-[16px] mb-[5px] gap-3 ">
            <Link className=" hover:text-red-800" href="/">
              View All{" "}
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sweaters
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Blouses and Shirts
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Pants
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jeans
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jackets and Coats
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sleepwear
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Intimates
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Suiting
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Dresses
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Shoes
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <hr />
        <Collapsible>
          <CollapsibleTrigger className=" py-[14px]">
            <p className=" text-[15px] font-semibold  hover:text-red-800">
              FABRIC
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col text-[16px] mb-[5px] gap-3">
            <Link className=" hover:text-red-800" href="/">
              View All{" "}
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sweaters
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Blouses and Shirts
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Pants
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jeans
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Jackets and Coats
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Sleepwear
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Intimates
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Suiting
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Dresses
            </Link>
            <Link className=" hover:text-red-800" href="/">
              Shoes
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <hr />
      </div>
    </>
  );
};

export default Filter;
