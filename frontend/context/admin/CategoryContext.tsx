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
  categoryDetails: iCategoryResponse | null;
  upadteDetails: iCategoryResponse | null;
  loading: boolean;
  loadingCategory: boolean;
  loadingUpdate: boolean;
  error: string | null;
  getCategoryById: (categoryId: string) => void;
  updateCategory: (categoryId: string, data: FormData) => void;
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
  categoryDetails: null,
  loading: true,
  error: null,
  getCategoryById: () => {},
  updateCategory: () => {},
  upadteDetails: null,
  loadingCategory: true,
  loadingUpdate: true,
};

const CategoryContext = createContext(defaultCategoryValue);

export const CategoryProvider = ({ children }: iChildren) => {
  const [category, setCategory] = useState<iCategory | null>(null);
  const [categoryDetails, setCategoryDetails] =
    useState<iCategoryResponse | null>(null);
  const [upadteDetails, setUpadteDetails] = useState<iCategoryResponse | null>(
    null
  );

  const [loading, setLoading] = useState(true);
    const [loadingCategory, setLoadingCategory] = useState(false); // Separate loading for category fetching
    const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState(null);
  // get all category
  const getAllCategories = async () => {
    setLoading(true);
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

  // get category by id
  const getCategoryById = async (categoryId: string) => {
     setLoadingCategory(true);
    try {
      const res = await axiosInstence.get<{ data: iCategoryResponse }>(
        `/category/category_details/${categoryId}`,
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      setCategoryDetails(res.data.data);
      setError(null);
    } catch (error) {
      setError(null);
      console.log(error);
    } finally {
      setLoadingCategory(false);
    }
  };

  // update category
  const updateCategory = async (categoryId: string, data: FormData) => {
    setLoadingUpdate(true)
    try {
      const res = await axiosInstence.put<iCategoryResponse>(
        `/category/edit-category/${categoryId}`,
        data,
        {
          withCredentials: true, // Include credentials in the request
          headers: {
            "Content-Type": "multipart/form-data", // Make sure this is set automatically
          },
        }
      );
      setUpadteDetails(res.data);
      setError(null);
    } catch (error) {
      setError(null);
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryDetails,
        category,
        loading,
        error,
        loadingCategory,
        loadingUpdate,
        getCategoryById,
        upadteDetails,
        updateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
