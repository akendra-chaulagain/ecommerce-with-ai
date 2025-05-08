"use client";
import { axiosInstence } from "@/hooks/axiosInstence";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingPage from "@/components/webiste/Loading";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  color?: string;
  brand?: string;
  description?: string;
  discountPrice?: number;
  category?: string;
  categoryId: string;
}

const ProductsPage = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  // Extract query param on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || "";
      setQuery(q);
    }
  }, []);

  // Fetch products when query is available
  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axiosInstence.get(
          `search/search-product?term=${query}`
        );
        setProducts(response.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

 

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Header */}
            <div className="text-center py-12 space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Results for{" "}
                <span className="text-red-600">&quot;{query}&quot;</span>
              </h1>
              <p className="text-gray-500 text-lg">
                {products?.length} {products?.length === 1 ? "item" : "items"}{" "}
                found
              </p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <Link
                  href={"/products"}
                  className="text-red-600 mx-auto w-16 h-16 mb-4"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
                <p className="text-xl text-gray-700">No matching products</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product,index) => (
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
                            src={
                              product.images[0] || "/api/placeholder/300/300"
                            }
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
                              backgroundColor:
                                clr.trim().toLowerCase() || "#000",
                            }}
                            title={clr.trim()}
                          ></span>
                        ))}
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-end gap-2">
                          {product?.discountPrice &&
                          product.discountPrice > 0 ? (
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
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
