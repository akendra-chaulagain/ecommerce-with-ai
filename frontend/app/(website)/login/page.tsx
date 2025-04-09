"use client";
import LoadingPage from "@/components/webiste/Loading";
import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import React, { useState } from "react";

interface LoginResponse {
  message: string;
  token?: string;
}

const Page = () => {
  // const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const showToast = useNotificationToast(); // Use the custom hook

  const LoginUser = async () => {
    setLoading(true);
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

      const message = response.data.message;

      showToast(message);
      setTimeout(() => {
        window.location.href = "/login/verifyotp";
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        setError(errorMessage);
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
      {loading ? (
        <LoadingPage />
      ) : (
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
                required
              />
              <br />
              <input
                type="password"
                className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Show error message if there is an error */}
              {error && <p className="text-red-600 mt-2">{error}</p>}
              <div className="mt-[20px] ">
                <Button
                  onClick={LoginUser}
                  className="bg-red-600 text-white border-2 w-[400px] hover:text-black hover:bg-white px-[40px] py-[25px]"
                >
                  {/* LOGIN */}
                  {loading ? "Loading..." : "LOGIN"}
                </Button>
              </div>
              {}
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
      )}
    </>
  );
};

export default Page;
