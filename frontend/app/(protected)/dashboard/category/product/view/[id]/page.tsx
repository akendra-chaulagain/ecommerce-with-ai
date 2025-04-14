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
  // get category id from the url
  const { id } = useParams();

  const [product, setProduct] = useState<iProduct>();
  const [loading, setLoading] = useState(false);

  // get  product accordinbg to the category id

  useEffect(() => {
    // Fetch product data when the component mounts or when the category ID changes
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
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className=" max-w-1xl mx-auto bg-white rounded-lg shadow p-8 px-20">
          <div className="flex justify-end">
            <Link
              href={`/dashboard/category/product/${product?.data.categoryId}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              <X />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex gap-2 mt-4">
                <Carousel
                  plugins={[plugin.current]}
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                  // opts={{ dots: true }}
                  className="relative w-[80%] h-[70vh]"
                >
                  <CarouselContent>
                    {product?.data?.images?.map((data, index: number) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <div className="relative w-full h-[70vh] ">
                          {" "}
                          <Image
                            src={data}
                            alt="logo"
                            layout="fill"
                            objectFit="content"
                            className="cursor-pointer"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-3xl font-semibold">{product?.data.name}</h1>
              <p className="text-gray-600">SKU:{product?.data.SKU}</p>

              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-red-500">
                  ${product?.data.price}
                </p>
                <p className="line-through text-gray-400">
                  ${product?.data.discountPrice}
                </p>
              </div>

              <p className="text-gray-700">
                This is the product description. It explains the features and
                benefits of the item.
              </p>

              <div>
                <p className="font-medium text-gray-800">Brand:</p>
                <p>{product?.data.brand}</p>
              </div>

              {/* <div>
                <p className="font-medium text-gray-800">Category:</p>
                <p>{product?.data.name}</p>
              </div> */}

              <div>
                <p className="font-medium text-gray-800">Material:</p>
                <p>{product?.data.material}</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Gender:</p>
                <p>{product?.data?.gender}</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Color:</p>
                <div className="flex gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-black border" />
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-800">Size:</p>
                <div className="flex gap-2 mt-1">
                  {product?.data.size.map((size, index) => (
                    <span key={index} className="px-3 py-1 border rounded-md">
                      {size}
                    </span>
                  ))}
                  {/* <span className="px-3 py-1 border rounded-md">M</span> */}
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-800">Specifications:</p>
                <p>{product?.data.specifications}</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Status:</p>
                <p className="text-green-600 font-semibold">
                  {product?.data?.isActive}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
