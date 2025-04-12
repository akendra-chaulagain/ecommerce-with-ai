"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import axios from "axios";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

interface iCategoryContext {
  getAllCategories: (page: number) => void;
  catDeleting: boolean;
  category: iCategory | null;
  categoryDetails: iCategoryResponse | null;
  upadteDetails: iCategoryResponse | null;
  loading: boolean;
  loadingCategory: boolean;
  loadingUpdate: boolean;
  setCurrentPage: (page: number) => void;
  addLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  deleteCategory: (categoryId: string) => void;
  getCategoryById: (categoryId: string) => void;
  updateCategory: (categoryId: string, data: FormData) => void;
  createCategory: (data: FormData) => void;
}
interface iChildren {
  children: ReactNode;
}

interface iCategory {
  data: iCategoryResponse[];
  length: number | null;
  totalPages: number;
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
  getAllCategories: () => {},
  currentPage: 1,
  deleteCategory: () => {},
  setCurrentPage: () => {},
  catDeleting: false,
  totalPages: 1,
  categoryDetails: null,
  loading: true,
  error: null,
  getCategoryById: () => {},
  updateCategory: () => {},
  upadteDetails: null,
  loadingCategory: true,
  addLoading: true,
  loadingUpdate: true,
  createCategory: () => {},
};

const CategoryContext = createContext(defaultCategoryValue);

export const CategoryProvider = ({ children }: iChildren) => {
  const showToast = useNotificationToast();
  const [category, setCategory] = useState<iCategory | null>(null);
  const [categoryDetails, setCategoryDetails] =
    useState<iCategoryResponse | null>(null);
  const [upadteDetails, setUpadteDetails] = useState<iCategoryResponse | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(false); // Separate loading for category fetching
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [catDeleting, setCatDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // get all category
  const limit = 7;
  const getAllCategories = async (page: number) => {
    setLoading(true);
    try {
      const res = await axiosInstence.get<iCategory>(
        `/category/tree?page=${page}&limit=${limit}`,
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      // const { data, pagination } = res.data;
      setCategory(res.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      setError(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCategories(currentPage);
  }, [currentPage]);

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
    setLoadingUpdate(true);
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

  // create category
  const createCategory = async (data: FormData) => {
    setAddLoading(true);

    try {
      const res = await axiosInstence.post<iCategoryResponse>(
        `/category/create-category`,
        data,
        {
          withCredentials: true, // Include credentials in the request
          headers: {
            "Content-Type": "multipart/form-data", // Make sure this is set automatically
          },
        }
      );
      showToast("Category added successfully");
      setUpadteDetails(res.data);
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response?.data?.message ||
              "An unknown error occurred. Try again"
            : error.response?.data;
        showToast(errorMessage);
      }
    } finally {
      setAddLoading(false);
    }
  };

  // delete category
  const deleteCategory = async (categoryId: string) => {
    setCatDeleting(true);
    try {
      await axiosInstence.delete<iCategoryResponse>(
        `/category/delete_category/${categoryId}`,
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      showToast("Category deleted successfully");
      setError(null);
    } catch (error) {
      setError(null);
      console.log(error);
    } finally {
      setCatDeleting(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        getAllCategories,
        categoryDetails,
        category,
        loading,
        error,
        loadingCategory,
        loadingUpdate,
        getCategoryById,
        upadteDetails,
        updateCategory,
        createCategory,
        addLoading,
        setCurrentPage,
        currentPage,
        totalPages,
        deleteCategory,
        catDeleting,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
