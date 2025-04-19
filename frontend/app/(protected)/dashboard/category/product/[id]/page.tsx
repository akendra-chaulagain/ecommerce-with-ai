"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EyeIcon,
  Trash2Icon,
  PlusIcon,
  PencilIcon,
  ShoppingBag,
  PackagePlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dashboard/dialog";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useParams } from "next/navigation";
import LoadingPage from "@/components/webiste/Loading";
import { useNotificationToast } from "@/hooks/toast";

interface Product {
  name: string;
  SKU: string;
  images: string[];
  isActive: boolean;
  price: number;
  brand: string;
  size: [string];
  gender: string;
  description: string;
  category: string;
  categoryId: string;
  _id: string;
  color: [string];
}
interface iProductResponse {
  products: Product[];
  name: string;
  categoryImage: string;
  description: string;
  _id: string;
}

const ProductListingPage = () => {
  const showToast = useNotificationToast();
  // get category id from the url
  const { id } = useParams();

  const [product, setProduct] = useState<iProductResponse>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const getProductData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await axiosInstence.get(
          `/category/${id}?page=${page}&limit=${limit}`
        );
        const resData = response.data;
        setProduct({
          name: resData.name,
          categoryImage: resData.categoryImage,
          description: resData.description,
          _id: resData._id,
          products: resData.products,
        });
        setTotalPages(resData.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    getProductData(currentPage);
  }, [getProductData, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // delete product
  const handledelete = async (productId: string) => {
    setLoading(true);
    try {
      await axiosInstence.delete(`/product/delete-product/${productId}`, {
        withCredentials: true,
      });
      showToast("Product deleted successfully");
      getProductData(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full mx-auto rounded-xl border shadow-sm bg-white">
          {/* Header Section */}
          <div className="bg-gradient-to-r  p-6 rounded-t-xl border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {product?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your product inventory
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                // href={"/dashboard/category/addCategory/addProduct"}
                href={`/dashboard/category/addCategory/addProduct?sub_cat_id=${id}`}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:text-white focus:outline-none "
                >
                  <PackagePlusIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Product</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Product</div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-1">
                      Price
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Product 1 */}
                {product?.products?.map((data: Product, index: number) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={data?.images?.[0] || ""}
                            alt="Smartphone"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {data?.name.slice(0, 50)}
                          </p>
                          <p className="text-xs text-gray-500">{data?.SKU}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {data?.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${data?.price}{" "}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {data?.gender}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/category/product/view/${data._id}`}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link
                          href={`/dashboard/category/product/editProduct/${data._id}`}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-amber-600"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <ConfirmDialog
                          trigger={
                            <Button
                              // onClick={handledelete(data._id)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          }
                          title="Delete Product"
                          description="Are you sure you want to delete this product? This action cannot be undone."
                          confirmText="Delete"
                          cancelText="Cancel"
                          onConfirm={() => {
                            handledelete(data._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end gap-4 mt-6 py-6 px-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded bg-red-600 text-white"
            >
              Next
            </button>
          </div>

          {/* Empty State - would show conditionally if needed */}
          {false && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                You havent added any products yet or your search filters didnt
                match any products.
              </p>
              <Link href="/dashboard/products/add-product">
                <Button className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductListingPage;
