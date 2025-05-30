import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
// import '../app/'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "@/components/ui/toaster";

import { CartProvider } from "@/context/CartContent";
import { ShippingProvider } from "@/context/ShippingContext";
import Topbar from "@/components/webiste/Topbar";
import Logobar from "@/components/webiste/Logobar";
import Navbar from "@/components/webiste/Navbar";
import Footer from "@/components/webiste/Footer";
import ResponsiveNavBar from "@/components/webiste/ResponsiveNavbar";

// import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ak Store",
  description: "BY Akendra Chaulagain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased website`}
      >
        
          <CartProvider>
            <ShippingProvider>
              <ResponsiveNavBar />
              {/* <ResponsiveNavBar/> */}
              <header>
                <Topbar />
                <Logobar />
                <Navbar />
              </header>
              {children}
              <footer>
                <Footer />
              </footer>
              <Toaster />
            </ShippingProvider>
          </CartProvider>
       
      </body>
    </html>
  );
}
