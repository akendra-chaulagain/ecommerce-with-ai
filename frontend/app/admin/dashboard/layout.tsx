"use client"

import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  // You can use any authentication method here, for example, checking if the user is logged in
  const user = useAuth();


  // if (!user) {
  //   redirect("/login"); // Redirect to login if not authenticated
  // }

  return (
    <div>
      {/* Optionally, you can add a common header, sidebar, etc. here */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
