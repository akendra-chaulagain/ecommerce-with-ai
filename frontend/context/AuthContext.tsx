"use client"
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { axiosInstence } from "@/hooks/axiosInstence";
import { User } from "@/types/types";

interface iChildren {
  children: ReactNode;
}
interface iUser {
  user: User | null;
  loading: boolean;
}

const defaultUserValue: iUser = {
  user: null,
  loading: true,
};

const AuthContext = createContext(defaultUserValue);

export const AuthProvider = ({ children }: iChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getLogunUser = async () => {
    try {
      const res = await axiosInstence.get("users/login-user/profile", {
        withCredentials: true,
      });
      
      if (res.data) {
        setUser(res.data); // Assuming res.data contains user information
      } else {
        setUser(null); // Set null if the response doesn't have user data
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLogunUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
