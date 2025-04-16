"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  useCallback,
} from "react";

interface iChildren {
  children: ReactNode;
}

interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

interface iOrder {
  _id: string;
  orderId: string;
  transactionId: string;
  userId: string;
  shippingAddress: string;
  products: OrderProduct[];
  totalPrice: number;
  taxAmount: number;
  orderStatus: "Approved" | "Pending" | "Rejected" | string;
  paymentStatus: "Approved" | "Pending" | "Failed" | string;
  deliveryDate: string;
  getOrderLoading: boolean;
  length: number;
  createdAt:string
  //   map:
}

// Default state for an order

// Order Context
const OrderContext = createContext<{
  getOrderLoading: boolean;
  order: iOrder[] | null;
  getOrderData: () => void;
}>({
  getOrderLoading: false,
  order: null,
  getOrderData: () => {}, // Dummy function to avoid initial error
});

export const OrderProvider = ({ children }: iChildren) => {
  const [order, setOrder] = useState<iOrder[] | null>(null); // Single order, or null
  const [getOrderLoading, setOrderLoading] = useState<boolean>(false);

  const getOrderData = useCallback(async () => {
    setOrderLoading(true);
    try {
      const response = await axiosInstence.get(`/order`);
      setOrder(response.data); // Assuming response.data is a single order object
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setOrderLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrderData(); // Automatically fetch the order data when the component mounts
  }, [getOrderData]);

  return (
    <OrderContext.Provider value={{ getOrderLoading, order, getOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
