// pages/settings.jsx
"use client";
import LoadingPage from "@/components/webiste/Loading";
import { useAuth } from "@/context/AuthContext";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserSettings() {
  const { user, getLogunUser } = useAuth();
  const [email, setEmail] = useState<string | undefined>();
  const [contact, setContact] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [avtarImage, setAvtarImage] = useState<File | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const showToast = useNotificationToast(); // Use the custom hook

  const handleUpdateDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      }

       await axiosInstence.put(
        "/users/update-user",
        {
          email,
          contact,
          name,
        },
        { withCredentials: true }
      );
      // const message = response.data.message;
      window.location.reload();
      // showToast(message);
      getLogunUser();
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

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstence.put(
        "/users/reset-password",
        {
          password,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );
      // const message = response.data.message;
      window.location.reload();

      // showToast(message);
      // getLogunUser();
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
    } finally {
      setLoading(false);
    }
  };
  const [avtarPreview, setAvtarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (avtarImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvtarPreview(reader.result as string);
      };
      reader.readAsDataURL(avtarImage);
    } else {
      setAvtarPreview(null);
    }
  }, [avtarImage]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-8 mt-[10px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Page Header */}
              <div className="pb-5 border-b border-gray-200 mb-6 flex items-center gap-3">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                ></svg>
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Account Settings
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Manage your profile information, password, and account
                    preferences.
                  </p>
                </div>
              </div>

              {/* Profile Section */}
              <div className="bg-white/90 shadow-xl rounded-2xl overflow-hidden mb-10 border border-red-100">
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="7" r="4" />
                      <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
                    </svg>
                    Profile Information
                  </h2>

                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-red-200 shadow-lg">
                      <Image
                        src={
                          avtarPreview ||
                          user?.avtar ||
                          "/default-avatar.png"
                        }
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
                        onChange={(e) => setAvtarImage(e.target.files?.[0])}
                      />
                      <label
                        htmlFor="profile-image"
                        className="py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-semibold text-red-600 bg-white hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 cursor-pointer transition"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <form onSubmit={handleUpdateDetails}>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700"
                          >
                            Full Name
                          </label>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user?.name}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={user?.email}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact"
                            className="block text-sm font-semibold text-gray-700"
                          >
                            Number
                          </label>
                          <input
                            onChange={(e) => setContact(e.target.value)}
                            type="text"
                            name="contact"
                            id="contact"
                            defaultValue={user?.contact}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                          />
                        </div>

                        {error && (
                          <span className="text-red-600 col-span-2">
                            {error}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 py-2 px-6 border border-transparent shadow-lg text-base font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-white/90 shadow-xl rounded-2xl overflow-hidden border border-red-100">
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17v1m0-8a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 4-4zm0 0V7a4 4 0 1 1 8 0v2" />
                    </svg>
                    Change Password
                  </h2>

                  <form onSubmit={handleUpdatePassword}>
                    <div className="space-y-8">
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-semibold text-gray-700"
                        >
                          Current Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-semibold text-gray-700"
                        >
                          New Password
                        </label>
                        <input
                          onChange={(e) => setNewPassword(e.target.value)}
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-semibold text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-gray-50"
                        />
                        {passwordError && (
                          <span className="text-red-600">{passwordError}</span>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 py-2 px-6 border border-transparent shadow-lg text-base font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
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
