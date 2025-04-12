"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Image from "next/image";
import Link from "next/link";
import LoadingPage from "@/components/webiste/Loading";
import ConfirmDialog from "@/components/dashboard/dialog";

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
              <Table>
                <TableHeader>
                  <TableRow className="font-bold">
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Created Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category?.data.map((datcategoryData) => (
                    <TableRow key={datcategoryData._id}>
                      <TableCell className="font-medium">
                        {datcategoryData._id}
                      </TableCell>
                      <TableCell>{datcategoryData.name}</TableCell>
                      <TableCell>{datcategoryData.description}</TableCell>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                          <Image
                            src={datcategoryData.categoryImage || "/"}
                            alt="Profile"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(datcategoryData.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center space-x-2">
                          <Link
                            href={`/dashboard/category/${datcategoryData._id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                              Edit
                            </Button>
                          </Link>
                          {/* for dialog  */}
                          {/* <Dialog/> */}
                          <ConfirmDialog
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              >
                                Delete
                              </Button>
                            }
                            title="Are you sure you want to delete ?"
                            description="This will permanently delete the category."
                            confirmText="Delete"
                            cancelText="Cancel"
                            onConfirm={() =>
                              handleDeleteCategory(datcategoryData._id)
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

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
