"use client";
import { Star, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { axiosInstence } from "@/hooks/axiosInstence";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { iProduct, iReview } from "@/types/types";
import Review from "../../components/Review";
import { useAuth } from "@/context/AuthContext";
import { useNotificationToast } from "@/hooks/toast";
import { useCart } from "@/context/CartContent";

const Page = () => {
  const { refreshCart } = useCart();

  const user = useAuth();
  const userId = user?.user?._id;
  const pathname = usePathname();
  const parts = pathname.split("/");

  const lastId = parts[parts.length - 1].replace("product-details-", "");
  const [product, setProduct] = useState<iProduct | null>(null);
  const [error, setError] = useState<boolean>(false);
  console.log(error);

  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const showToast = useNotificationToast();
  const [color, setColor] = useState("");
  const [size, setsize] = useState("");

  // get product details
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstence.get<iProduct>(
          `review/review_according-to-product/${lastId}${
            userId ? `?userId=${userId}` : " "
          }`
        );

        setProduct(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [lastId, userId]);

  const reviews: iReview[] = product?.reviews ?? [];

  // for product images slider
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const handleRatingUpdate = (rating: number) => {
    setRating(rating);
  };

  const updateCartQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // size and color
  const colorData = product?.details?.color?.split(",");
  const sizeData = product?.details?.size?.split(",");

  // handle add to cart
  const handleAddToCart = async () => {
    try {
      if (!size || !color) {
        showToast("Please select size and color before adding to cart.");
        return;
      }
      if (user.user === null) {
        showToast("Please Login to perform this action.");
        return;
      }
      const response = await axiosInstence.post(
        "/cart/add-to-cart",
        {
          productId: lastId,
          quantity,
          size,
          color,
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
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="w-full aspect-square mb-4"
            >
              <CarouselContent>
                {product?.details?.images?.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full aspect-square bg-white">
                      <Image
                        src={imageUrl}
                        alt={`${product?.details?.name} - View ${index + 1}`}
                        fill
                        className="object-contain p-4"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                <CarouselPrevious className="pointer-events-auto left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="pointer-events-auto right-2 bg-white/80 hover:bg-white" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2">
          {/* Product Title and Reviews */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product?.details?.name}
            </h1>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        rating
                          ? index < Math.round(parseFloat(rating.toString()))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-700">
                  {reviews?.length}{" "}
                  {reviews?.length === 1 ? "Review" : "Reviews"}
                </p>
              </div>

              <span className="text-sm text-gray-500">Style # P251121032</span>
            </div>
          </div>

          {/* Price */}
          <div className="py-4 border-t border-b border-gray-200">
            <div className="flex items-center">
              {product?.details?.discountPrice &&
              product.details.discountPrice > 0 ? (
                <>
                  <h2 className="text-2xl font-bold text-red-600">
                    ${product.details.discountPrice}
                  </h2>
                  <span className="ml-2 text-gray-500 line-through text-lg">
                    ${product.details.price}
                  </span>
                </>
              ) : (
                <h2 className="text-2xl font-bold text-red-600">
                  ${product?.details?.price}
                </h2>
              )}
            </div>
          </div>

          {/* Color Selection */}
          <div className="py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">COLOR</h3>
            <div className="flex flex-wrap gap-3">
              {colorData?.map((colorValue, index) => (
                <button
                  key={index}
                  onClick={() => setColor(colorValue)}
                  className={`w-6 h-6  flex items-center justify-center transition-all ${
                    color === colorValue
                      ? "ring-2 ring-offset-2 ring-red-600"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                  aria-label={`Color: ${colorValue}`}
                >
                  <span
                    className="w-6 h-6 "
                    style={{ backgroundColor: colorValue || "#000" }}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">SIZE</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizeData?.map((sizeValue, index) => (
                <button
                  key={index}
                  onClick={() => setsize(sizeValue)}
                  className={`px-4 py-2 border rounded-md min-w-12 text-center transition-colors ${
                    size === sizeValue
                      ? "border-red-600 bg-red-50 text-red-600 font-medium"
                      : "border-gray-300 hover:border-gray-400 bg-white text-gray-700"
                  }`}
                >
                  {sizeValue.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="py-6 space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => updateCartQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <span className="text-lg font-medium">−</span>
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  onClick={() => updateCartQuantity(1)}
                >
                  <span className="text-lg font-medium">+</span>
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 rounded-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="font-medium">ADD TO CART</span>
              </Button>
            </div>
          </div>

          {/* Product Description */}
          <div className="py-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">DESCRIPTION</h3>
            <div className="prose prose-sm text-gray-700">
              <p>{product?.details?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <Review
          reviews={reviews}
          lastId={lastId}
          sendRatingToParent={handleRatingUpdate}
        />
      </div>
    </div>
  );
};

export default Page;
