"use client";
import { ArrowRight, Eye, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import Category from "../../category.json";

import Link from "next/link";

const Product = () => {
  return (
    <>
      <section className=" bg-white">
        <div className=" mx-auto px-6">
          <div className="flex justify-center mb-12">
            <h1 className=" font-semibold text-[27px] mb-[20px] tracking-wide text-[#adb5bd]">
              #OUR PRODUCTS
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {Category.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.photo}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <button
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Quick view"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform">
                    <button className="w-full bg-black text-white py-3 font-medium flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold">${product.price}</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-red-600 fill-red-600" />
                      <Star className="h-4 w-4 text-red-600 fill-red-600" />
                      <Star className="h-4 w-4 text-red-600 fill-red-600" />
                      <Star className="h-4 w-4 text-red-600 fill-red-600" />
                      <Star className="h-4 w-4 text-red-600 fill-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-10">
            <Link
              href="/products"
              className="text-gray-900 font-medium inline-flex items-center hover:underline"
            >
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className=" mx-auto relative overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-red-600 text-white p-12 lg:p-16 flex items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-white text-gray-900 text-sm font-bold mb-6">
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
                  href="/collections/featured"
                  className="inline-flex items-center bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-200 transition-colors"
                >
                  Discover More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-auto">
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
