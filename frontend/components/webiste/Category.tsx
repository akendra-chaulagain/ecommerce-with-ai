"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ResposnsiveBar from "@/components/webiste/resposnsiveNavbar";
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
      link: "/collections/spring",
      // color: "from-emerald-900/70 to-emerald-950/90",
    },
    {
      image: "/h2.jpg",
      title: "Limited Edition Series",
      subtitle: "Premium quality that defines your style",
      cta: "Explore Now",
      link: "/collections/limited-edition",
      // color: "from-indigo-900/70 to-indigo-950/90",
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
      <ResposnsiveBar />

      {/* for bi display bigger than 1024px */}
      <span className="flex justify-center mt-[20px] text-red-700">
        Discount will appear in shopping bag. Exclusions apply
      </span>
      <section className="relative h-[80vh] w-full overflow-hidden mt-[10px]">
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
                src={slide.image|| "/h1.jpg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}
              ></div> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`text-center text-white max-w-4xl px-6 ${
                    isVisible ? "animate-fade-in" : ""
                  }`}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <Link
                    href={slide.link}
                    className="bg-red-600 text-white-900 px-8 py-4 font-medium inline-flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>
    </>
  );
};

export default Category;
