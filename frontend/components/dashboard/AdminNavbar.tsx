import { Bell, Menu, MessageSquare, Search, User } from 'lucide-react';
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar';

const AdminNavbar = () => {
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
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right side of navbar - User actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <span className="hidden md:inline font-medium">Akendra</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;