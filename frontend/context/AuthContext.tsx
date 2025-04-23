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
  getLoginUser: () => Promise<void>;
  user: User | null;
}

const defaultUserValue: iUser = {
  user: null,
  loading: true,
  getLoginUser: async () => {},
};

const AuthContext = createContext(defaultUserValue);

export const AuthProvider = ({ children }: iChildren) => {
  const [user, setUser] = useState<User | null>(null);

const [loading, setLoading] = useState<boolean>(false); 

const getLoginUser = async () => {
  // setLoading(true);
  try {
    const res = await axiosInstence.get("users/login-user/profile", {
      withCredentials: true,
    });
    setUser(res.data ?? null);
  } catch (error) {
    setUser(null);
    console.error("Error fetching user", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getLoginUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, loading, getLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
