"use client";
import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import axios from "axios";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface LoginResponse {
  message: string;
}

const Page = () => {
  // expire timer
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const seconds = timeLeft % 60;

  // verify otp
  const [otp, setOtp] = useState<number>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const verifyOTP = async () => {
    setLoading(true);
    const otpData = {
      otp,
    };

    try {
      const response = await axiosInstence.post<LoginResponse>(
        "/users/login/verify-user",
        otpData,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="border-2 px-[30px] py-[50px]">
          <div className=" flex text-[20px]  font-semibold mb-[13px] text-red-600">
            Please Enter OTP
            <span className="flex justify-center ml-[10px] mt-[4px] text-red-600 text-[15px] font-semibold">{`(Expires in: ${String(
              seconds
            ).padStart(2, "0")}s)`}</span>
          </div>
          <p className="text-[14px] mb-[20px] font-semibold">
            Your One Time Password(OTP) has been sent to via email <br /> to
            your registered email.
          </p>
          <div className="">
            <input
              type="tel"
              className="border-2 h-[50px] w-full px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              name="otp"
              placeholder="Enter a 6 digit code"
              maxLength={6}
              pattern="[0-9]{6}"
              value={otp}
              onChange={(e) => setOtp(Number(e.target.value))}
              required
            />
            {/* Show error message if there is an error */}
            {/* {error && <p className="text-red-600 mt-2">{error}</p>} */}
            <div className="mt-[10px]">
              <Button
                onClick={verifyOTP}
                className="bg-red-600 text-white border-2 w-[400px] hover:text-black hover:bg-white px-[40px] py-[25px]"
              >
                {/* Verify */}
                {loading ? "Loading..." : "Verify"}
              </Button>
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
          {/* <span className="flex justify-center my-[8px] text-gray-500 cursor-pointer hover:text-red-600">
            Forget Password ?
          </span> */}
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
