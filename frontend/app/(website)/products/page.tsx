"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContent";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  color?: string;
  brand?: string;
  description?: string;
  discountPrice?: number;
  data: [];
  categoryId: string;
}

const ProductsPage = () => {
  const showToast = useNotificationToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useAuth();

  const fetchProducts = useCallback(
    async (page: number, limit: number = 25) => {
      try {
        setLoading(true); // set loading to true when fetching
        const response = await axiosInstence.get(
          `/product/all-products?page=${page}&limit=${limit}`
        );

        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const { refreshCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    if (!user.user) {
      showToast("You must be logged in to perform this action.");
    }
    try {
      const response = await axiosInstence.post(
        "/cart/add-to-cart",
        {
          productId,
          quantity: 1,
        },
        { withCredentials: true }
      );
      showToast(response.data.message);
      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 mt-14">
          <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Premium Products
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of high-quality products designed for both
            style and comfort. Find your perfect match!
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-xl text-gray-600 py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            products?.map((product, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-[#f2f2f2] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative">
                  <Link
                    href={`/category/${product.categoryId}/product-details-${product._id}`}
                  >
                    <div className="h-64 overflow-hidden">
                      <Image
                        src={product.images[0] || "/api/placeholder/300/300"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  {/* Wishlist Button */}
                  <Link
                    href={`/category/${product.categoryId}/product-details-${product._id}`}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Eye
                      size={18}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    />
                  </Link>
                </div>

                <div className="p-4">
                  {/* Brand*/}
                  <div className="flex justify-between items-center mb-2">
                    {product.brand && (
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <Link
                    href={`/category/${product.categoryId}/product-details-${product._id}`}
                  >
                    <h3 className="text-base font-semibold text-gray-800 mb-1 hover:text-red-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Color Variants */}
                  <div className="flex gap-1 mb-3">
                    {product.color?.split(",").map((clr, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 border"
                        style={{
                          backgroundColor: clr.trim().toLowerCase() || "#000",
                        }}
                        title={clr.trim()}
                      ></span>
                    ))}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-end gap-2">
                      {product?.discountPrice && product.discountPrice > 0 ? (
                        <>
                          <h2 className="text-2xl font-bold text-red-600">
                            ${product.discountPrice}
                          </h2>
                          <span className="ml-2 text-gray-500 line-through text-lg">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <h2 className="text-2xl font-bold text-red-600">
                          ${product?.price}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && (!products || products.length === 0) && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={28} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default ProductsPage;
