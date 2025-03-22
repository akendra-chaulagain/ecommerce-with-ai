"use client";
import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import axios from "axios";
import Link from "next/link";

import React, { useState } from "react";
import { toast } from "react-toastify";



interface LoginResponse {
  message: string;
  token?: string;
}

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  

  const LoginUser = async () => {
    const userData = {
      email,
      password,
    };
    try {
      const response = await axiosInstence.post<LoginResponse>(
        "/users/login-user",
        userData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message, {});
      setTimeout(() => {
         window.location.href = "/";
      }, 2000);

    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data || "An unknown error occurred. try again"
        );
      } else {
        setError("Network error or server not reachable.");
      }

      // console.log(error.response.data);
    }
  };

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
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show error message if there is an error */}
            {error && <p className="text-red-600 mt-2">{error}</p>}
            <div className="mt-[20px] ">
              <Button
                onClick={LoginUser}
                className="bg-red-600 text-white border-2 w-[400px] hover:text-black hover:bg-white px-[40px] py-[25px]"
              >
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

export default Page;
