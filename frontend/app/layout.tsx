import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <AuthProvider>
        <body className="website">{children}</body>
      </AuthProvider>
    </html>
  );
}
