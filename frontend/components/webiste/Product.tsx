"use client";
import { ArrowRight, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { iProduct } from "@/types/types";
import { axiosInstence } from "@/hooks/axiosInstence";

const Product = () => {
  const [product, setproduct] = useState<iProduct[]>([]);
  const [error, setError] = useState<boolean>(false);

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
            {product?.map((product, index) => (
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

                  <Link
                    href={`/category/${product.categoryId}/product-details-${product._id}`}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Eye
                      size={18}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    />
                  </Link>
                  {/* Discount Badge */}
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
