import React, { Suspense } from "react";
import SearchComponent from "@/components/webiste/SearchComponent";
import LoadingPage from "@/components/webiste/Loading";

const SearchPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SearchComponent />
    </Suspense>
  );
};

export default SearchPage;
