"use client";
import { useCategory } from "@/context/admin/CategoryContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
  const pathname = usePathname();
  const parts = pathname.split("/");

  const categoryId = parts[parts.length - 1].replace("product-details-", "");
  const { categoryDetails, getCategoryById, updateCategory } = useCategory();
  const [fetchedCategoryId, setFetchedCategoryId] = useState<string | null>(
    null
  );
  const [name, setName] = useState(categoryDetails?.name || "");
  const [categoryImage, setCategoryImage] = useState<File | string>(
    categoryDetails?.categoryImage || ""
  );
  const [description, setDescription] = useState(
    categoryDetails?.description || ""
  );

  // get data
  useEffect(() => {
    // Prevent unnecessary API calls if the categoryId is the same
    if (categoryId !== fetchedCategoryId) {
      getCategoryById(categoryId);
      setFetchedCategoryId(categoryId);
    }
  }, [categoryId, getCategoryById, fetchedCategoryId]);

  // handle uodate
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // If categoryImage is a File, append it to FormData
    if (categoryImage instanceof File) {
      formData.append("categoryImage", categoryImage); // Only append if it's a new file
    }

    try {
      await updateCategory(categoryId, formData);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  useEffect(() => {
    if (categoryDetails) {
      setName(categoryDetails.name);
      setDescription(categoryDetails.description);
      setCategoryImage(categoryDetails.categoryImage);
    }
  }, [categoryDetails]);
  console.log(categoryImage);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </Link>
          </div>

          <form>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={categoryDetails?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <div className=" items-center space-x-6">
                {categoryDetails?.categoryImage && (
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={
                        categoryDetails?.categoryImage ||
                        "/images/product/p4.jpg"
                      }
                      alt="Current profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col ">
                  <label className=" py-2 text-red-600 underline">
                    <span>Choose new image</span>
                    <input
                      type="file"
                      className="hidden"
                      name="categoryImage"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCategoryImage(file); // Set file if selected
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                //   rows="4"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={categoryDetails?.description}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
