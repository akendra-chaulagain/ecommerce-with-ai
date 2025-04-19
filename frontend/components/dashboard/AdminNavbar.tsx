import { Menu, Search, Settings } from "lucide-react";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Props = {
  setSearchTerm: (value: string) => void;
};
const AdminNavbar = ({ setSearchTerm }: Props) => {
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between bg-white shadow-md px-6 py-4">
        {/* Left side of navbar - Sidebar Trigger */}
        <div className="flex items-center">
          <SidebarTrigger>
            <button className="p-2 rounded hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </SidebarTrigger>
          <h1 className="ml-4 text-xl font-bold hidden md:block">Dashboard</h1>
        </div>

        {/* Middle - Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="w-full relative">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right side of navbar - User actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Link href={"/dashboard/profile"}>
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
              <span className="hidden md:inline font-medium">{user?.name}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
