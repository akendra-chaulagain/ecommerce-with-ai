"use client";
import { axiosInstence } from "@/hooks/axiosInstence";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoadingPage from "@/components/webiste/Loading";
import { X } from "lucide-react";
import Link from "next/link";

interface iProduct {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    color: string;
    size: string[];
    material: string;
    specifications: string[];
    status: string;
    images: string[];
    SKU: string;
    discountPrice: number;
    isActive: boolean;
    gender: [string];
    categoryId: string;
  };
}

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<iProduct>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstence.get(
          `/product/product-details/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 px-10 md:px-20 mt-8">
          <div className="flex justify-end">
            <Link
              href={`/dashboard/category/product/${product?.data.categoryId}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              title="Back"
            >
              <X />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Image Carousel */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="relative w-full max-w-md h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
              >
                <CarouselContent>
                  {product?.data?.images?.map((img, idx) => (
                    <CarouselItem key={idx} className="flex justify-center">
                      <div className="relative w-full h-[400px] md:h-[500px]">
                        <Image
                          src={img}
                          alt={product?.data.name || "Product Image"}
                          fill
                          className="object-contain rounded-2xl bg-gray-50"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 justify-center">
                {product?.data?.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {product?.data.name}
              </h1>
              <p className="text-gray-500 text-sm">SKU: {product?.data.SKU}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold text-red-600">
                  ${product?.data.price}
                </span>
                {product?.data.discountPrice && (
                  <span className="line-through text-gray-400 text-xl">
                    ${product?.data.discountPrice}
                  </span>
                )}
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    product?.data.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product?.data.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-700 text-base mt-2">
                {product?.data.description || "No description available."}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-medium text-gray-800">Brand:</p>
                  <p className="text-gray-600">{product?.data.brand}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Material:</p>
                  <p className="text-gray-600">{product?.data.material}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Gender:</p>
                  <p className="text-gray-600">{product?.data?.gender}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Color:</p>
                  <div className="flex gap-2 mt-1">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: product?.data.color || "#000" }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-800">Size:</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {product?.data.size.map((size, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border rounded-md bg-gray-50"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-800">Specifications:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {product?.data.specifications}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
