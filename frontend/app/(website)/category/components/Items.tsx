import { Eye } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { iCategoryResponse, iColor } from "@/types/types";

interface ItemsProps {
  category: iCategoryResponse | null;
  colorData: iColor | null;
}

const Items = ({ category, colorData }: ItemsProps) => {
  return (
    <>
      <div className="grid col-span-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[10px]">
        {colorData
          ? colorData.products?.map((product, index) => (
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
          : category?.products?.map((product, index) => (
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

                  {/* Discount Badge */}
                </div>

                <div className="p-4">
                  {/* Brand  */}
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
                      {product.name.slice(0, 70)}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description.slice(0, 90)}
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
    </>
  );
};

export default Items;
