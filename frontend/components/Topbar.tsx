import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    // hidden  sm:hidden lg:block
    <>
      <div className=" bg-black h-auto  w-auto text-white text-[14px]   hidden  sm:hidden lg:block">
        <div className="flex justify-center items-center p-1.5">
          <div className="cursor-pointer pr-[14px]">
            25% DISCOUNT ON SCOTIA CREDIT CARD!
          </div>
          <div className="cursor-pointer text-[#c1c1c1]">
            <Link
              href="/category"
              className="underline mr-[7px] hover:text-white"
            >
              SHOP NOW
            </Link>
            <span className="mr-[7px] ">|</span>
            <Link href="/category/1" className="underline hover:text-white">
              DETAILS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
