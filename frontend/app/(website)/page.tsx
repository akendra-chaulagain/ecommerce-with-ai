import Category from "@/components/webiste/Category";
import Product from "@/components/webiste/Product";
import Semi_cat from "@/components/webiste/Semi_cat";
import Homeslider from "@/components/webiste/Homeslider";
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
