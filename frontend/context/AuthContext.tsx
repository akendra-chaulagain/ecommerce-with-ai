"use client";
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
  // user: User | null;
  loading: boolean;
  getLogunUser: () => Promise<void>;
  user: User | null;
}

const defaultUserValue: iUser = {
  user: null,
  loading: true,
  getLogunUser: async () => {},
};

const AuthContext = createContext(defaultUserValue);

export const AuthProvider = ({ children }: iChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLogunUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstence.get("users/login-user/profile", {
        withCredentials: true,
      });

      if (res.data) {
        setUser(res.data ?? null); // Assuming res.data contains user information
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
    <AuthContext.Provider value={{ user, loading, getLogunUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
