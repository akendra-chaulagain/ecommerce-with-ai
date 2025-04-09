"use client";
import { Button } from "@/components/ui/button";
import React, { FormEvent, useState } from "react";
import { AxiosError } from "axios"; // Import AxiosError from axios
import Link from "next/link";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

interface ErrorResponse {
  message: string;
}

const Page = () => {
  const showToast = useNotificationToast(); // Use the custom hook

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contact, setContact] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const userData = {
      name,
      email,
      password,
      contact,
    };

    try {
      const response = await axiosInstence.post(
        "/users/register-user",
        userData
      );

      // window.location.href = "/login"; // This will redirect the user to the login page
      const message = response.data.message;
      showToast(message);

      // router.push("/logins");
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>; // Cast the error to our custom type

      if (axiosError.response) {
        setError(
          axiosError.response.data.message ||
            "An unknown error occurred. try again"
        );
      } else {
        setError("Network error or server not reachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="border-2 px-[30px] py-[50px]">
          <h1 className="text-[20px]  font-semibold mb-[13px] text-red-600">
            Create a new account
          </h1>
          <form onSubmit={registerUser}>
            <input
              type="text"
              className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <br />
            <input
              type="text"
              className="border-2 h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Enter a full name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <br />
            <input
              type="number"
              className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Contact number"
              name="contact"
              value={contact || " "}
              onChange={(e) => setContact(Number(e.target.value))}
              required
            />
            <br />

            <br />
            <input
              type="text"
              className="border-2  h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Enter a Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {/* <input
              type="text"
              className="border-2 mt-[20px] h-[50px] w-[400px] px-[10px] focus:border-red-600 focus:ring-1 outline-none rounded-lg"
              placeholder="Confirm Password"
            /> */}
            <div className="mt-[20px] ">
              <Button
                disabled={loading}
                className="bg-red-600 text-white border-2 w-[400px] hover:text-black hover:bg-white px-[40px] py-[25px]"
              >
                {loading ? "Loading..." : "REGISTER"}
              </Button>
            </div>
          </form>
          {/* Show error message if there is an error */}
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <span className="flex justify-center my-[8px] text-gray-500 cursor-pointer hover:text-red-600">
            Forget Password ?
          </span>
          <hr />

          <div className="mt-[20px]">
            <Link
              href="/login"
              className="  text-gray-500 cursor-pointer hover:text-red-600 "
            >
              Already have an account ?{" "}
              <span className="text-red-600 underline">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
