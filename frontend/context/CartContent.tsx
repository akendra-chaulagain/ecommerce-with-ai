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

interface iCartContext {
  cart: iCartResponse | null;
  refreshCart: () => Promise<void>;
}

const defaultCartValue: iCartContext = {
  cart: null,
  refreshCart: async () => {},
};

const CartContext = createContext<iCartContext>(defaultCartValue);

export const CartProvider = ({ children }: iChildren) => {
  const [cart, setcart] = useState<iCartResponse | null>(null);

  const getCartDetails = async () => {
    try {
      const res = await axiosInstence.get("/cart", {
        withCredentials: true,
      });

      if (res.data) {
        setcart(res.data.cart);
      } else {
        setcart(null);
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
    <CartContext.Provider value={{ cart, refreshCart: getCartDetails }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
