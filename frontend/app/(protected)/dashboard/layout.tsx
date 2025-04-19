"use client";
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/admin-sidebar";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import { CategoryProvider } from "@/context/admin/CategoryContext";
import { OrderProvider } from "@/context/admin/OrderContext";

import { axiosInstence } from "@/hooks/axiosInstence";
import SearchResults from "@/components/dashboard/search";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/webiste/Loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    setSearchTerm("");
  }, [pathname]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          const res = await axiosInstence.get(`/search?term=${searchTerm}`);
          setResults(res.data);
        } catch (err) {
          console.error("Search error", err);
        }
      } else {
        setResults(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const { user, loading } = useAuth();
  const router = useRouter();

  // redirect to the webiste
  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "Admin") {
      router.push("/login");
    }
  }, [user, router, loading]); // Ensure this runs when user or loading state changes

  if (loading) {
    return <LoadingPage />; // Show loading screen while fetching user data
  }

  if (!user || user.role !== "Admin") {
    return null; // Return null if the user is not admin, blocking access to the dashboard
  }

  return (
    <CategoryProvider>
      <OrderProvider>
        <SidebarProvider>
          <div className="w-full flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col w-full">
              <AdminNavbar setSearchTerm={setSearchTerm} />
              <main className="w-full flex-1 overflow-auto px-20 py-10 bg-gray-50">
                {searchTerm ? <SearchResults results={results} /> : children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </OrderProvider>
    </CategoryProvider>
  );
}
