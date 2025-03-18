import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      {/* <div className="mt-[25px] px-[20px] text-[14px] font-bold hidden md:block"> */}
      <div className="mt-[25px] px-[20px] text-[14px] font-bold hidden  sm:hidden lg:block">
        <ul className="flex justify-between">
          <Link
            href="/"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Home
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            New Arrivals
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Clothing
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Shoes
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Accessories
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Petite
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            T By Talbots
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Havan Well Within
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            The Edit
          </Link>
          <Link
            href="/category"
            className=" cursor-pointer hover:underLinkne hover:text-red-800"
          >
            Sale
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
