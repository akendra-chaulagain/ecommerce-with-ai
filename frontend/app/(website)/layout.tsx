
import Navbar from "@/components/webiste/Navbar";
import Logobar from "@/components/webiste/Logobar";
import Topbar from "@/components/webiste/Topbar";
import { Toaster } from "@/components/ui/toaster";

import Footer from "@/components/webiste/Footer";
import React from "react";
import ResponsiveNavBar from "@/components/webiste/resposnsiveNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="website">
      <header>
        <ResponsiveNavBar>
          <Topbar />
          <Logobar />
          <Navbar />
        </ResponsiveNavBar>
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
      <Toaster />
    </div>
  );
}
