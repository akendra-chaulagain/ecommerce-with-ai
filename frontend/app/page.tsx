import Category from "@/components/Category";
import Product from "@/components/Product";
import Semi_cat from "@/components/Semi_cat";
import Homeslider from "@/components/Homeslider";
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const page = () => {
  return (
    <>
      <Category />
      <Semi_cat />
      <Product />
      <Homeslider />
    </>
  );
};

export default page;
