"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { axiosInstence } from "@/hooks/axiosInstence";
import { iCartResponse } from "@/types/types";

interface iChildren {
  children: ReactNode;
}
interface iCart {
  cart: iCartResponse | null;
}

const defaultCartValue: iCart = {
  cart: null,
 
};
const CartContext = createContext(defaultCartValue);
export const CartProvider = ({ children }: iChildren) => {
  const [cart, setcart] = useState(null);
  const getCartDetails = async () => {
    try {
      const res = await axiosInstence.get("/cart", {
        withCredentials: true,
      });

      if (res.data) {
        setcart(res.data.cart); // Assuming res.data contains user information
      } else {
        setcart(null); // Set null if the response doesn't have user data
      }
    } catch (error) {
      setcart(null);
      console.log(error);
    }
  };
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
