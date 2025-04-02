"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { axiosInstence } from "@/hooks/axiosInstence";
import { IShippingAddress } from "@/types/types";

interface iChildren {
  children: ReactNode;
}
interface ShippingContextType {
  shippingAddress: IShippingAddress | null; 
}

const ShippingContext = createContext<ShippingContextType>({
  shippingAddress: null,
});

export const ShippingProvider = ({ children }: iChildren) => {
  const [shippingAddress, setShippingAddress] =
    useState<IShippingAddress | null>(null);

  const getShippindDetails = async () => {
    try {
      const res = await axiosInstence.get<IShippingAddress>("/shipping", {
        withCredentials: true,
      });

      setShippingAddress(res.data); // Assuming res.data contains user information
    } catch (error) {
      setShippingAddress(null);
      console.log(error);
    }
  };
  useEffect(() => {
    getShippindDetails();
  }, []);

  return (
    <ShippingContext.Provider value={{ shippingAddress }}>
      {children}
    </ShippingContext.Provider>
  );
};
export const useShippingAddress = () => useContext(ShippingContext);
