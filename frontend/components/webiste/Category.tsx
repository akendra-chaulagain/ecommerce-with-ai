"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import ResposnsiveBar from "@/components/webiste/ResposnsiveNavbar";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      image: "/h1.jpg",
      title: "Summer Offer",
      subtitle: "Discover timeless elegance with our exclusive pieces",
      cta: "Shop Collection",
      link: "/products",
    },
    {
      image: "/h2.jpg",
      title: "Limited Edition Series",
      subtitle: "Premium quality that defines your style",
      cta: "Explore Now",
      link: "/products",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <>
      {/* <ResposnsiveBar /> */}

      <span className="block text-center mt-6 text-sm sm:text-base text-red-700 px-4">
        Discount will appear in shopping bag. Exclusions apply
      </span>

      <section className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden mt-4">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image || "/h1.jpg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
                <div
                  className={`text-center text-white max-w-3xl sm:max-w-4xl ${
                    isVisible ? "animate-fade-in" : ""
                  }`}
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.link}
                    className="bg-red-600 hover:bg-white text-white hover:text-black transition-colors px-6 sm:px-8 py-3 sm:py-4 font-medium inline-flex items-center rounded-full"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-white/30 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-white/30 transition"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-6 bg-white" : "w-2.5 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Category;
