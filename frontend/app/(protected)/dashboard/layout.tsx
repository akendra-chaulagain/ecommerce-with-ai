"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/admin-sidebar";
// import Navbar from "@/components/webiste/Navbar";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import { CategoryProvider } from "@/context/admin/CategoryContext";
import { OrderProvider } from "@/context/admin/OrderContext";
// import { AppNavbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CategoryProvider>
      <OrderProvider>
        <SidebarProvider>
          <div className="w-full flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col w-full">
              <AdminNavbar />
              <main className="w-full flex-1 overflow-auto px-20 py-10 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
          {/* </div> */}
        </SidebarProvider>
      </OrderProvider>
    </CategoryProvider>
  );
}
