"use client";
import { ArrowRight, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { iProduct } from "@/types/types";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";
import { useCart } from "@/context/CartContent";

const Product = () => {
  const [product, setproduct] = useState<iProduct[]>([]);
  const [error, setError] = useState<boolean>(false);
  const showToast = useNotificationToast();

  console.log(error);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get("/product/home-product");
        setproduct(response.data.data); // Only 6 items
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, []);
  const { refreshCart } = useCart();
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
      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <section className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide text-[#555] mb-3">
              #OUR LATEST PRODUCTS
            </h1>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
            {product?.map((product) => (
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
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto relative overflow-hidden rounded-lg max-w-1xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-red-600 text-white p-8 sm:p-12 lg:p-16 flex items-center">
              <div>
                <span className="inline-block px-4 py-1  text-white-900 text-sm font-bold mb-6">
                  NEW COLLECTION
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Elevate Your Style This Season
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Discover our curated selection of premium pieces designed for
                  the modern lifestyle.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-200 transition-colors"
                >
                  Discover More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto">
              <Image
                src="/images/slider/s2.webp"
                alt="Feature collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
