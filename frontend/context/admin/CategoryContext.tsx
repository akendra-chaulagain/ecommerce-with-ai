"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

interface iCategoryContext {
  category: iCategory | null;
  loading: boolean;
  error: string | null;
}
interface iChildren {
  children: ReactNode;
}

interface iCategory {
  data: iCategoryResponse[];
  length: number | null;
}
interface iCategoryResponse {
  _id: string;
  categoryImage: string;
  name: string;
  description: string;
  createdAt: string;
}
const defaultCategoryValue: iCategoryContext = {
  category: null,
  loading: true,
  error: null,
};

const CategoryContext = createContext(defaultCategoryValue);

export const CategoryProvider = ({ children }: iChildren) => {
  const [category, setCategory] = useState<iCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getAllCategories = async () => {
    try {
      const res = await axiosInstence.get<iCategory>("/category/", {
        withCredentials: true, // Include credentials in the request
      });
      setCategory(res.data);
      setError(null);
    } catch (error) {
      setError(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
