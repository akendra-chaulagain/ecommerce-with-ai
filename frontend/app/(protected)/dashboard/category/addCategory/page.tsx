import React, { Suspense } from "react";

import LoadingPage from "@/components/webiste/Loading";
import AddCategoryData from "@/components/dashboard/addCategoryData";

const page = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AddCategoryData />
    </Suspense>
  );
};

export default page;
