"use client";
import React from "react";
import AddProduct from "../../../../../../components/dashboard/addProductData";

export default function AddProductWrapper() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddProduct />
    </React.Suspense>
  );
}
