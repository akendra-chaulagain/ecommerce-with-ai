

"use client";
import Image from "next/image";
import Link from "next/link";

const MothersDayHero = () => {
  return (
    <section className="relative h-[55vh] w-full overflow-hidden mb-[45px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/h1.jpg" // Replace with your actual image path
          alt="Mother's Day Celebration"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        {/* Main Headings */}
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide">
            Dress to
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif font-bold italic">
            Impress
          </h2>
        </div>

        {/* Celebration Text */}
        <div className="my-8">
          <p className="text-3xl md:text-4xl font-semibold tracking-wider mb-4">
            CELEBRATE
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/products"
            className="bg-red-600 text-white px-8 py-3 md:px-10 md:py-4 text-sm md:text-base font-semibold uppercase tracking-wide hover:text-black hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MothersDayHero;
