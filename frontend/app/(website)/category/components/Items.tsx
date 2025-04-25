import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { iCategoryResponse, iColor } from "@/types/types";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

interface ItemsProps {
  category: iCategoryResponse | null;
  colorData: iColor | null;
}

const Items = ({ category, colorData }: ItemsProps) => {
  const showToast = useNotificationToast();

  const handleAddToCart = async (lastId: string) => {
    try {
      const response = await axiosInstence.post(
        "/cart/add-to-cart",
        {
          productId: lastId,
          quantity: 1,
        },
        { withCredentials: true }
      );
      // Update cart state or trigger a toast notification directly
      showToast(response.data.message);
      // Optionally, update cart state here to reflect changes in UI
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid col-span-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[10px]">
        {colorData
          ? colorData.products?.map((product, index) => (
              <div
                key={product._id || index}
                className="cursor-pointer border-2 border-[#f2f2f2] p-4 rounded"
              >
                <Link
                  href={`/category/${category?._id}/product-details-${product?._id}`}
                >
                  <Image
                    src={product.images?.[0] || "/images/default.png"}
                    alt={product.details?.name || "Product"}
                    width={300}
                    height={200}
                    className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="mt-3 ml-[6px] flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-red-600">
                      ${product.price}
                    </h3>
                  </div>
                  <p className="text-[16px] ml-[6px]">
                    {product?.name?.slice(0, 20)}
                  </p>
                  {product?.brand && (
                    <div className="mt-2 mb-2 ml-[6px]">
                      <span className="text-sm">
                        Brand:
                        <span className="font-semibold ml-2 text-red-600">
                          {product?.brand}
                        </span>
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex gap-2 mt-1 ">
                  {product?.color?.split(",").map((clr, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: clr.trim().toLowerCase() || "#000",
                      }}
                    ></span>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddToCart(product._id)}
                  variant="outline"
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 hover:text-white text-white text-sm flex items-center justify-center gap-2"
                >
                  Add to Cart <ShoppingCart size={16} />
                </Button>
              </div>
            ))
          : category?.products?.map((product, index) => (
              <div
                key={product?._id || index}
                className="cursor-pointer border-2 border-[#f2f2f2] p-4 rounded"
              >
                <Link
                  href={`/category/${category._id}/product-details-${product._id}`}
                >
                  <Image
                    src={product?.images[0] || "/images/default.png"}
                    alt={product.details?.name || "Product"}
                    width={300}
                    height={200}
                    className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="mt-3 ml-[6px] flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-red-600">
                      ${product.price}
                    </h3>
                  </div>
                  <p className="text-[16px] ml-[6px]">
                    {product?.name?.slice(0, 20)}
                  </p>
                  {product?.brand && (
                    <div className="mt-2 mb-2 ml-[6px]">
                      <span className="text-sm">
                        Brand:
                        <span className="font-semibold ml-2 text-red-600">
                          {product?.brand}
                        </span>
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex gap-2 mt-1 ">
                  {product?.color?.split(",").map((clr, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: clr.trim().toLowerCase() || "#000",
                      }}
                    ></span>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddToCart(product._id)}
                  variant="outline"
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 hover:text-white text-white text-sm flex items-center justify-center gap-2"
                >
                  Add to Cart <ShoppingCart size={16} />
                </Button>
              </div>
            ))}
      </div>
    </>
  );
};

export default Items;
