import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="website">{children}</body>
    </html>
  );
}
