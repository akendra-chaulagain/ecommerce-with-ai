"use client";
import {  Home, Inbox, ListOrdered, Newspaper,  Settings } from "lucide-react";
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
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      {/* Fixed width for the sidebar */}
      <SidebarContent className="bg-gray-100 h-full">
        <div className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="px-5 pt-10 pb-6">
              <Link href={"/dashboard"}>
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={150}
                  height={150}
                  className="cursor-pointer"
                />
              </Link>
            </SidebarGroupLabel>
            <hr />
            <SidebarGroupContent className="px-5 pt-3 pb-6">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="text-base font-semibold mt-[10px]">
                        <item.icon />
                        <span className="text-[16px]">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="p-5">
            <span className="flex justify-center font-semibold">
              akendra@gmail.com
            </span>
            <button className="w-full bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition mt-2">
              Logout
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
