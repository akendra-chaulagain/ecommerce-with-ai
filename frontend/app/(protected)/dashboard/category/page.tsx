"use client";

import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/admin/CategoryContext";
import Link from "next/link";
import LoadingPage from "@/components/webiste/Loading";
import CategoryTree from "@/components/dashboard/CategoryRecursiveUi";

const Page = () => {
  const {
    getAllCategories,
    deleteCategory,
    setCurrentPage,
    currentPage,
    totalPages,
    loading,
    category,
  } = useCategory();
  // delete category
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      await getAllCategories(currentPage); // Refresh the category list after deletion
      // Optionally, you can refresh the category list here
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  console.log(category);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full mx-auto rounded-md border px-10">
          <div className="bg-white p-6 rounded-t-md border-b flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Categories
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                A list of your recent product categories
              </p>
            </div>
            <div>
              <Link href="/dashboard/category/addCategory">
                <Button
                  variant="outline"
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:text-white focus:outline-none "
                >
                  Add New Category
                </Button>
              </Link>
            </div>
          </div>

          {category?.data && category?.data.length > 0 ? (
            <>
              {/* Table with Categories */}
              <CategoryTree
                categories={category.data}
                onDelete={handleDeleteCategory}
              />

              {/* Pagination */}
              <div className="p-4 bg-green-60 border-t flex justify-between items-center">
                <span className="text-sm text-red-600">
                  Showing{" "}
                  <span className="font-medium">{category?.data.length}</span>{" "}
                  category
                </span>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          // disabled={currentPage === 1}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={() => setCurrentPage(totalPages)}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          // disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">No categories available</div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
