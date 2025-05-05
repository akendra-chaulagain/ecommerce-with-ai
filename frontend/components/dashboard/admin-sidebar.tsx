"use client";
import { Home, Inbox, ListOrdered, Newspaper, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Category",
    url: "/dashboard/category",
    icon: Inbox,
  },
  {
    title: "Order",
    url: "/dashboard/order",
    icon: ListOrdered,
  },
  {
    title: "Review",
    url: "/dashboard/review",
    icon: Newspaper,
  },
  {
    title: "Settings",
    url: "/dashboard/profile",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const showToast = useNotificationToast();
  const handleLogoutUser = async () => {
    try {
      await axiosInstence.post(
        "/users/logout-user",
        {},

        {
          withCredentials: true,
        }
      );
      showToast("Logout successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
      showToast("Logout failed");
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-gray-50 h-full shadow-xl">
        <div className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="px-5 pt-10 pb-6 flex items-center gap-2">
              <Link href={"/dashboard"}>
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={150}
                  height={150}
                  className="cursor-pointer drop-shadow-lg"
                />
              </Link>
            </SidebarGroupLabel>
            <hr className="border-gray-200 opacity-60" />
            <SidebarGroupContent className="px-5 pt-3 pb-6">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 text-base font-semibold mt-[10px] px-3 py-2 rounded-lg transition-all hover:bg-gray-100  group"
                      >
                        <item.icon className="h-5 w-5 text-gray-500 group- transition" />
                        <span className="text-[16px] group-">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="p-5">
            <span className="flex justify-center font-semibold px-5 text-[13px] text-gray-500">
              {user?.email}
            </span>
            <button
              onClick={handleLogoutUser}
              className="w-full bg-white border border-red-600 text-red-600 py-2 px-4 rounded-xl font-bold hover:bg-red-600 hover:text-white transition mt-2 shadow"
            >
              Logout
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
