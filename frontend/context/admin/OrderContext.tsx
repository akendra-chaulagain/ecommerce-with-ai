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
interface iProductDetails {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  sku: number;
  color: string[];
  size: string[];
  isActive: boolean;
  categoryId: string;
  images: string[];
  createdAt: string;
  brand: string;
  gender: string;
  material: string;
  specifications: string;
  quantity: number;
}

interface iOrder {
  _id: string;
  userId: string;
  orderId: string;
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  transactionId: string;
  taxAmount: number;
  deliveryDate: string;
  createdAt: string;
  productDetails: iProductDetails[];
  userDetails: {
    _id: string;
    name: string;
    email: string;
    contact: string;
    createdAt: string;
  };
  shippinDetails: {
    _id: string;
    userId: string;
    name: string;
    contact: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdAt: string;
  };
}
interface OrderResponse {
  order: iOrder; 
  productDetails: iProductDetails[];
}

// Default state for an order

// Order Context
const OrderContext = createContext<{
  getOrderLoading: boolean;
  order: iOrder[] | null;
  getOrderData: () => void;
  getOrderById: (orderId: string) => Promise<void>;
  OrderDetails: OrderResponse | null;
  loadingOrder: boolean;
}>({
  getOrderLoading: false,
  order: null,
  getOrderData: () => {},
  getOrderById: async () => {},
  OrderDetails: null,
  loadingOrder: false,
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
    getOrderData();
  }, [getOrderData]);

  //
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [OrderDetails, setOrderDetails] = useState<OrderResponse | null>(null);

  const getOrderById = useCallback(async (orderId: string) => {
    setLoadingOrder(true);
    try {
      const res = await axiosInstence.get<OrderResponse>(
        `/order/order-details/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setOrderDetails(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOrder(false);
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        getOrderLoading,
        order,
        getOrderData,
        getOrderById,
        OrderDetails,
        loadingOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
