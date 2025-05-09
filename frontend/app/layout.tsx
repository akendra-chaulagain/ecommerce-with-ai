import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "AK Store",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="website">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
