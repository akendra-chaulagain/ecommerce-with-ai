"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const showToast = useNotificationToast();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // In a real app, you would pass query and filters to this API call
        const response = await axiosInstence.get("/product");
        setProducts(response.data.data);
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 flex justify-center py-12">
          SEARCH RESULTS
        </h2>
        <div className="flex justify-end items-center mb-8">
          <p className="text-gray-600">{products.length} items</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-[#f2f2f2] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative">
                  <Link href={`/product/${product._id}`}>
                    <div className="relative aspect-[3.8/4] overflow-hidden">
                      <Image
                        src={product.images?.[0] || "/api/placeholder/300/300"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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

                  {/* Discount Badge */}
                </div>

                <div className="p-4">
                  {/* Brand & Rating */}
                  <div className="flex justify-between items-center mb-2">
                    {product.brand && (
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <Link href={`/product/${product._id}`}>
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
                      <span className="text-lg font-bold text-red-600">
                        ${product?.discountPrice || product.price}
                      </span>
                      {product?.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.price}
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
            ))}
          </div>
        )}

        {/* Page Navigation */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:text-red-600">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:text-red-600">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:text-red-600">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:text-red-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
