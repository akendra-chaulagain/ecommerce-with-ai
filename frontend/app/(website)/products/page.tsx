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
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <Link
                    href={`/category/${product.categoryId}/product-details-${product._id}`}
                    className="block h-full"
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder-product.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      // onClick={() => handleAddToCart(product._id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-600 hover:text-white"
                      aria-label="Quick view"
                    >
                      <Link
                        href={`/category/${product.categoryId}/product-details-${product._id}`}
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      {product.brand && (
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                          {product.brand}
                        </span>
                      )}
                      <Link
                        href={`/category/${product.categoryId}/product-details-${product._id}`}
                        className="block"
                      >
                        <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Color Swatches */}
                  {product.color && (
                    <div className="flex gap-2">
                      {product.color.split(",").map((clr, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                          style={{ backgroundColor: clr.trim() }}
                          aria-label={`Color option: ${clr.trim()}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Price & Add to Cart */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-red-600">
                        ${product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="p-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-red-300"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
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
