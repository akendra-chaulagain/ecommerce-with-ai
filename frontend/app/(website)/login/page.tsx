"use client";
import LoadingPage from "@/components/webiste/Loading";
import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Lock, LogIn, MailCheck, ShieldAlert, RefreshCw } from "lucide-react";

interface LoginResponse {
  message: string;
  token?: string;
}

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState<number>();
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isExpired, setIsExpired] = useState(false);
  const showToast = useNotificationToast();
  

 

  // Timer countdown effect
  useEffect(() => {
    if (!showOtpSection) return;

    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showOtpSection]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // login user
  const LoginUser = async () => {
    setLoading(true);
    setError("");
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

      setShowOtpSection(true);
      // Reset OTP timer
      setTimeLeft(60);
      setIsExpired(false);
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
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
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
      const message = response.data.message;
      showToast(message);

      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 2000);
    } catch (error: unknown) {
      console.log(error);
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
    } finally {
      setLoading(false);
    }
  };

  // for resend otp
  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    setLoading(true);
    setTimeLeft(60);
    const otpData = {
      otp,
    };

    try {
      const response = await axiosInstence.post<LoginResponse>(
        "/users/login/resent-otp",
        otpData,
        {
          withCredentials: true,
        }
      );
      const message = response.data.message;
      showToast(message);
      setShowOtpSection(true);
      // Reset OTP timer
      setTimeLeft(60);
      setIsExpired(false);
      setTimeout(() => {
window.location.href=("/")
      }, 2000);
    } catch (error: unknown) {
      console.log(error);
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-red-600 py-4">
              <h1 className="text-center text-white text-2xl font-bold flex items-center justify-center gap-2">
                {showOtpSection ? (
                  <ShieldAlert className="text-white" />
                ) : (
                  <LogIn className="text-white" />
                )}
                <span>{showOtpSection ? "Verify OTP" : "Welcome Back"}</span>
              </h1>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {!showOtpSection ? (
                // Login Form
                <div className="space-y-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <MailCheck />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    onClick={LoginUser}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>SIGN IN</span>
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              ) : (
                // OTP Verification Form
                <div className="space-y-5">
                  <div className="text-center mb-6">
                    <p className="text-gray-700">
                      Enter the 6-digit code sent to your email
                    </p>
                    <div
                      className={`font-mono font-medium mt-2 ${
                        isExpired ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {isExpired
                        ? "OTP Expired"
                        : `Expires in ${formatTime(timeLeft)}`}
                    </div>
                  </div>

                  <div className=" gap-2 mb-4">
                    <input
                      type="text"
                      name="otp"
                      maxLength={6}
                      className="w-full h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      value={otp}
                      onChange={(e) => setOtp(Number(e.target.value))}
                      disabled={isExpired}
                      required
                    />
                  </div>

                  <Button
                    onClick={verifyOTP}
                    disabled={isExpired}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span>VERIFY</span>
                  </Button>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href="/login"
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Back to login
                    </Link>

                    <button
                      onClick={handleResendCode}
                      disabled={!isExpired && timeLeft > 0}
                      className={`text-sm flex items-center gap-1 ${
                        isExpired || timeLeft === 0
                          ? "text-red-600 hover:text-red-700"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <RefreshCw size={14} />
                      <span>Resend OTP</span>
                    </button>
                  </div>
                </div>
              )}

              {!showOtpSection && (
                <div className="mt-8 pt-5 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="text-gray-500 text-sm">OR</div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="font-medium text-red-600 hover:text-red-700 transition-colors"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
