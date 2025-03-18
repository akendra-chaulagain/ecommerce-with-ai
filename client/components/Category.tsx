import Image from "next/image";
import Link from "next/link";
import React from "react";
import ResposnsiveBar from "@/components/resposnsiveNavbar";

const Category = () => {
  return (
    <>
      <ResposnsiveBar />

      {/* for bi display bigger than 1024px */}
      <span className="flex justify-center mt-[20px] text-red-700">
        Discount will appear in shopping bag. Exclusions apply
      </span>

      <div className=" text-[16px] mt-[35px] ">
        <div className=" flex justify-center   h-[35vh] sm:grid-cols-1  lg:h-[83vh] lg:grid lg:grid-cols-2 bg-[#F2F3F5] ">
          <div className="hidden sm:hidden lg:block">
            <Link href={"/category"}>
              <Image
                src="/bg.png"
                alt="h1"
                width={600}
                height={100}
                className=" w-full object-fill h-[83vh]"
              />
            </Link>
          </div>
          <div className="flex items-center ">
            <div>
              <h1 className="text-[30px] font-bold text-gray-600 mb-[10px] ">
                NEW ARRIVALS ARE HERE
              </h1>
              <div className="flex justify-center">
                <Link
                  href="/category"
                  className="  px-[30px] py-[4px]  bg-red-600 hover:bg-white text-white hover:text-red-600"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* LEFY SIDE CATEGORY */}
      </div>
    </>
  );
};

export default Category;
