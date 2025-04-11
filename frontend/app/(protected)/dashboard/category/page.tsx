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
import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/admin/CategoryContext";
import Image from "next/image";
import Link from "next/link";
import LoadingPage from "@/components/webiste/Loading";

const Page = () => {
  const { loading, category } = useCategory();

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full  mx-auto rounded-md border">
          <div className="bg-white p-6 rounded-t-md border-b flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 ">
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

          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead>Name</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Created Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category?.data?.map((datcategoryData) => (
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
                    {" "}
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
                      <Link href={`/dashboard/category/${datcategoryData._id}`}>
                        <Button
                          // onClick={() => handleEdit(invoice.id)}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        // onClick={() => handleDelete(invoice.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{category?.data?.length}</span>{" "}
              category
            </span>
            {/* <div className="flex space-x-2">
              <Button variant="default" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Print
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
