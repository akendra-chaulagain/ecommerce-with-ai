"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/admin-sidebar";
// import Navbar from "@/components/webiste/Navbar";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import { CategoryProvider } from "@/context/admin/CategoryContext";
// import { AppNavbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CategoryProvider>
      <SidebarProvider>
        <div className="w-full flex h-screen overflow-hidden">
          <AppSidebar />
          <div className="flex flex-col w-full">
            <AdminNavbar />
            <main className="w-full flex-1 overflow-auto p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
        {/* </div> */}
      </SidebarProvider>
    </CategoryProvider>
  );
}
