"use client";

import React, { useState } from "react";
import {
  CreditCard,
  MapPin,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

const Logobar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const showToast = useNotificationToast();

  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/search?q=${searchText}`);
    }
  };

  const handleSelect = () => {
    setOpen(false);
  };

  const handleLogoutUser = async () => {
    try {
      await axiosInstence.post(
        "/users/logout-user",
        {},
        {
          withCredentials: true,
        }
      );

      showToast("Logout successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
      showToast("Logout failed");
    }
  };

  return (
    <div className="h-28   hidden sm:hidden lg:block">
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
        {/* Left section - Payment & Location */}
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <CreditCard className="flex-shrink-0" />
            <span className="ml-1">We Accept Paypal</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <MapPin className="flex-shrink-0" />
            <Link href="/locations" className="ml-1 hover:underline">
              Store Locator
            </Link>
          </div>
        </div>

        {/* Center section - Logo */}
        <div className="flex justify-center py-4">
          <Link href="/" passHref>
            <Image
              src="/logo.png"
              alt="AK Store Logo"
              width={100}
              height={60}
              className="cursor-pointer object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right section - Search, User, Settings, Cart */}
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center border border-gray-500 px-3 py-1 rounded">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Search"
              className="outline-none w-32"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search onClick={handleSearch} className="ml-2 cursor-pointer" />
          </div>

          {user === null ? (
            <Link
              href="/register"
              className="flex items-center hover:text-gray-900"
            >
              <User className="flex-shrink-0" />
              <span className="ml-1 hover:underline">Sign in</span>
            </Link>
          ) : (
            <Link
              href="/order"
              className="flex items-center hover:text-gray-900"
            >
              <span className="hover:underline">Orders</span>
            </Link>
          )}

          {user !== null && (
            <div className="relative">
              <Select open={open} onOpenChange={setOpen}>
                <SelectTrigger className="focus:outline-none focus:ring-0 border-none p-0">
                  <Settings className="cursor-pointer" />
                </SelectTrigger>

                <SelectContent className="w-40 bg-white shadow-lg rounded-md p-2">
                  <Link href="/profile" onClick={handleSelect}>
                    <span className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Profile
                    </span>
                  </Link>
                  <button
                    onClick={handleLogoutUser}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Log out
                  </button>
                </SelectContent>
              </Select>
            </div>
          )}

          <Link href="/cart" className="flex items-center hover:text-gray-900">
            <ShoppingCart className="flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logobar;
