import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { iCategoryResponse, iProductDetails } from "@/types/types";
interface iResuts {
  results: {
    category: iCategoryResponse[];
    product: iProductDetails[];
  };
  category: iCategoryResponse[];
  product: iProductDetails[];
}

const SearchResults = ({ results }: { results: iResuts }) => {
  if (!results) {
    return <p className="text-center text-gray-500">Searching...</p>;
  }

  const { category = [], product = [] } = results;

  if (category.length === 0 && product.length === 0) {
    return <p className="text-center text-gray-500">No results found</p>;
  }

  return (
    <div className="space-y-16">
      {/* Categories Table */}
      {category.length > 0 && (
        <div>
          <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-2">
            <svg
              className="h-7 w-7 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Categories
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Category</div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.map((cat: iCategoryResponse, index: number) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={cat.categoryImage || "/category-default.png"}
                            alt={cat.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {cat.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">{cat.description}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Link href={`/dashboard/category/edit/${cat._id}`}>
                          <button
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-amber-50 text-amber-600 transition"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600 transition"
                          title="Delete"
                          // onClick={() => handleCategoryDelete(cat._id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Table */}
      {product.length > 0 && (
        <div>
          <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-2">
            <svg
              className="h-7 w-7 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>
            Products
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Product</div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-1">
                      Price
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.map((data: iProductDetails, index: number) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={data?.images?.[0] || "/product-default.png"}
                            alt={data?.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {data?.name?.slice(0, 50)}
                          </p>
                          <p className="text-xs text-gray-500">{data?.SKU}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {data?.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${Number(data?.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {data?.gender || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/category/product/view/${data._id}`}
                        >
                          <button
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-600 transition"
                            title="View"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </Link>
                        <Link
                          href={`/dashboard/category/product/editProduct/${data._id}`}
                        >
                          <button
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-amber-50 text-amber-600 transition"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600 transition"
                          title="Delete"
                          // onClick={() => handledelete(data._id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
