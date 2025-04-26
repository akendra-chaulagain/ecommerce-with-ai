"use client";
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
  const limit = 15;

  const fetchProducts = useCallback(async (page: number) => {
    try {
      setLoading(true); // set loading to true when fetching
      const response = await axiosInstence.get(
        `/product?page=${page}&limit=${limit}`
      );
     
      
      const resData = response.data;
      console.log(resData);
      
      setProducts(response.data.data); 
       setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage); 
  }, [fetchProducts, currentPage]);

  const handleAddToCart = async (productId: string) => {
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
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>

            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-gray-800">Products</span>
          </nav>
        </div>
      </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    <div className="h-80 overflow-hidden">
                      <Image
                        src={product.images[0] || "/api/placeholder/300/300"}
                        alt={product.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Eye
                      size={18}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    />
                  </button>
                </div>

                <div className="p-4">
                  {/* Product Name */}
                  <Link
                    href={`/category/${product?.categoryId}/product-details-${product._id}`}
                  >
                    <h3 className="text-base font-semibold text-gray-800 mb-1 hover:text-red-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price & Add to Cart */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-end gap-2">
                      <span className=" text-red-600 text-[16px] font-bold">
                        $ {product.discountPrice || product.price}.00
                      </span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.price}.00
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors duration-300"
                    >
                      <ShoppingCart size={18} />
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
