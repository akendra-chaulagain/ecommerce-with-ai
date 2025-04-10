import Navbar from "@/components/webiste/Navbar";
import Logobar from "@/components/webiste/Logobar";
import Topbar from "@/components/webiste/Topbar";
import { Toaster } from "@/components/ui/toaster";

import Footer from "@/components/webiste/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await currentUser();

  // const isAdmin = user?.publicMetadata?.role === "admin";
  // if (!isAdmin) {
  //   redirect("/");
  // }

  return (
    <div className="website">
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
    </div>
  );
}
