import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="border-2 px-[30px] py-[50px]">
          <h1 className="text-[20px]  font-semibold mb-[13px] text-red-600">
            Login Page{" "}
          </h1>
          <div className="">
            <input
              type="text"
              className="border-2 h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Email or Phone Number"
            />
            <br />
            <input
              type="text"
              className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Password"
            />
            <div className="mt-[20px] ">
              <Button className="bg-red-600 text-white border-2 w-[400px] hover:text-black hover:bg-white px-[40px] py-[25px]">
                LOGIN
              </Button>
            </div>
          </div>
          <span className="flex justify-center my-[8px] text-gray-500 cursor-pointer hover:text-red-600">
            Forget Password ?
          </span>
          <hr />
          
          <div className="mt-[20px]">
            <Link
              href="/register"
              className="  text-gray-500 cursor-pointer hover:text-red-600 "
            >
              Don&apos;t have an account ?{" "}
              <span className="text-red-600 underline">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
