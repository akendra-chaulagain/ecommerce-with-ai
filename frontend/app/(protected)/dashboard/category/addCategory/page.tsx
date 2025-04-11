"use client";

import LoadingPage from "@/components/webiste/Loading";
import { useCategory } from "@/context/admin/CategoryContext";

import { useNotificationToast } from "@/hooks/toast";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EditPage() {
  // get categary by id from the url
  const showToast = useNotificationToast(); // Use the custom hook

  // usestate for thr forms
  const [name, setName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | string>();
  const [description, setDescription] = useState("");

  //   context
  const { addLoading, createCategory } = useCategory();

  // add category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (categoryImage instanceof File) {
      formData.append("categoryImage", categoryImage);
    }
    try {
      await createCategory(formData);
    } catch (error) {
      console.log(error);
      showToast("Failed to add category");
    }
  };

  return (
    <>
      {addLoading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Add Category</h1>
              <Link
                href="/dashboard/category"
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
                  Title of the Category
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                <div className=" items-center space-x-6">
                  {categoryImage && typeof categoryImage === "string" && (
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        src={categoryImage}
                        alt="Current category"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col ">
                    <label className=" py-2 text-red-600 underline">
                      <span>Choose new image</span>
                      <input
                        required
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
                  value={description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                ></textarea>
                <span className="text-red-600 text-[12px]">
                  This message will appear on your website — keep it short,
                  clear, and appealing to users.
                </span>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  //   disabled={loadingUpdate || loadingCategory}
                  onClick={handleAddCategory}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
