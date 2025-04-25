"use client";
import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useNotificationToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstence.get("/product");
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Premium Products
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of high-quality products designed for both
            style and comfort. Find your perfect match!
          </p>
        </div>

        {/* Categories Quick Filter */}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-xl text-gray-600 py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            products?.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer border-2 border-[#f2f2f2] bg-white p-4 rounded hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/product/${product._id}`}>
                  <div className="overflow-hidden rounded-t-2xl">
                    <Image
                      src={product.images?.[0] || "/images/default.png"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-3 ml-[6px] flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-red-600">
                      ${product.discountPrice || product.price}
                    </h3>
                    {product.discountPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <p className="text-[16px] ml-[6px] text-gray-800 mt-1 font-medium line-clamp-1">
                    {product.name}
                  </p>

                  {/* Simple description preview */}
                  <p className="text-sm text-gray-500 ml-[6px] mt-1 line-clamp-1">
                    {product.description?.slice(0, 40) ||
                      "No description available"}
                  </p>

                  {product.brand && (
                    <div className="mt-2 mb-2 ml-[6px]">
                      <span className="text-sm">
                        Brand:
                        <span className="font-semibold ml-2 text-red-600">
                          {product.brand}
                        </span>
                      </span>
                    </div>
                  )}
                </Link>

                {/* Color options */}
                <div className="flex gap-2 mt-1 ml-[6px]">
                  {product.color?.split(",").map((clr, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: clr.trim().toLowerCase() || "#000",
                      }}
                      title={clr.trim()}
                    ></span>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddToCart(product._id)}
                  variant="outline"
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 hover:text-white text-white text-sm py-2 flex items-center justify-center gap-2"
                >
                  Add to Cart <ShoppingCart size={16} />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Empty state */}
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

        {/* Load more button */}
        {!loading && products?.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium px-8 py-3 rounded-full"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
