// pages/settings.jsx
"use client";
import LoadingPage from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function UserSettings() {
  const user = useAuth();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [avtarImage, setAvtarImage] = useState();
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const showToast = useNotificationToast(); // Use the custom hook
  console.log(user);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    try {
      if (avtarImage) {
        const formData = new FormData();
        formData.append("avtar", avtarImage);
        const response = await axiosInstence.put(
          "/users/update-avtar",

          formData,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const message = response.data.message;
        showToast(message);
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      }

      const response = await axiosInstence.put(
        "/users/update-user",
        {
          email,
          contact,
          name,
        },
        { withCredentials: true }
      );
      const message = response.data.message;
      showToast(message);
      setTimeout(() => {
        window.location.reload();
      }, 1100);

      //   toast(Response)
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
  //   handle update  password
  const handleUpdatePassowrd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstence.put(
        "/users/reset-password",
        {
          password,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );
      const message = response.data.message;
      setTimeout(() => {
        window.location.reload();
        showToast(message);
      }, 1100);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        setPasswordError(errorMessage);
      } else {
        setPasswordError("Network error or server not reachable.");
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 mt-[10px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Page Header */}
              <div className="pb-5 border-b border-gray-200 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Account Settings
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Manage your profile information, password, and account
                  preferences.
                </p>
              </div>

              {/* Profile Section */}
              <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Information
                  </h2>

                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                      <Image
                        src={user?.user?.avtar || ""}
                        alt="Profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="file"
                        id="profile-image"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          setAvtarImage(e.target.files?.[0]);
                        }}
                      />
                      <label
                        htmlFor="profile-image"
                        className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 cursor-pointer"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <form>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            // onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user?.user?.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={user?.user?.email}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Number
                          </label>
                          <input
                            onChange={(e) => setContact(e.target.value)}
                            type="text"
                            name="contact"
                            id="contact"
                            defaultValue={user?.user?.contact}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                          />
                        </div>
                        {error && <span className="text-red-600">{error}</span>}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleUpdateDetails}
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Change Password
                  </h2>

                  <form>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <input
                          onChange={(e) => setNewPassword(e.target.value)}
                          type="newPassword"
                          name="newPassword"
                          id="newPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm"
                        />
                        {passwordError && (
                          <span className="text-red-600">{passwordError}</span>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                          onClick={handleUpdatePassowrd}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
