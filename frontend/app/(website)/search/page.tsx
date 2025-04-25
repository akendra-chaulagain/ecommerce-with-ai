"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const showToast = useNotificationToast();

  useEffect(() => {
    if (!query) return;
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // In a real app, you would pass query and filters to this API call
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
                <div className="text-red-600 mx-auto w-16 h-16 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-xl text-gray-700">No matching products</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products?.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <Link
                        href={`/category/${product.categoryId}/product-details-${product._id}`}
                        className="block h-full"
                      >
                        <Image
                          src={
                            product.images?.[0] || "/placeholder-product.jpg"
                          }
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
                          onClick={() => handleAddToCart(product._id)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-600 hover:text-white"
                          aria-label="Quick view"
                        >
                          <Eye className="w-5 h-5" />
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
                ))}
              </div>
            )}

            {/* Pagination */}
            {/* <div className="flex justify-center mt-12">
              <nav className="flex gap-1">
                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200">
                  Previous
                </button>
                <button className="px-4 py-2 text-white bg-red-600 border border-red-600 rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200">
                  2
                </button>
                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200">
                  3
                </button>
                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200">
                  Next
                </button>
              </nav>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
