"use client";
import ConfirmDialog from "@/components/dashboard/dialog";
import LoadingPage from "@/components/webiste/Loading";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useNotificationToast } from "@/hooks/toast";

import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface iProduct {
  data: iProductDetails;
  message: string;
}
interface iProductDetails {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  material: string;
  specifications: string;
  status: string;
  sku: string;
  discountPrice: string;
  isActive: boolean;
  gender: string;
  categoryId: string;
  images: string[];
}

const Page = () => {
  const { id } = useParams();
  const showToast = useNotificationToast();
  // const [productDetails, setProductDetails] = useState<iProduct>();

  

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && productImages.length < 5) {
      setProductImages([...productImages, files[0]]);
    }
  };

  const [product, setProduct] = useState<iProductDetails>({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    color: "",
    size: "",
    material: "",
    specifications: "",
    status: "",
    sku: "",
    discountPrice: "",
    isActive: false,
    gender: "",
    categoryId: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // get product details by id
  const fetchDataFromId = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstence.get<iProduct>(
        `/product/product-details/${id}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      // setProductDetails(response.data);
      const productData = response.data.data;
      setProduct({
        ...productData,
      });

      setExistingImages(productData.images); // or productData.images, based on your API
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchDataFromId();
  }, [fetchDataFromId, id]);

  // update product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append product fields
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("categoryId", product.categoryId);
      formData.append("sku", product.sku);
      formData.append("brand", product.brand);
      formData.append("gender", product.gender); // Send gender as JSON string
      formData.append("isActive", product.isActive ? "true" : "false");

      formData.append("material", product.material);
      formData.append("discountPrice", product.discountPrice?.toString() || "");
      formData.append("specifications", product.specifications || "");
      formData.append("size", product.size || "");
      formData.append("color", product.color || "");

      // Flattened arrays as strings

      // size.forEach((s) => formData.append("size", s));
      // color.forEach((c) => formData.append("color", c));

      // Append image files
      productImages.forEach((image) => {
        formData.append("images", image); // "images" must match your backend multer key
      });

      await axiosInstence.put(`/product/update-product/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // optional; axios sets it for FormData
        },
      });
      setLoading(false);
      showToast("Product updated successfully");

      fetchDataFromId();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = async (image: string) => {
    const imageId = image?.split("/")?.pop()?.split(".")[0];
    setLoading(true);

    try {
      await axiosInstence.delete(
        `/product/delete-image/${imageId}?productId=${product._id}&imageUrl=${image}`
      );
      showToast("Image deleted");
      setLoading(false);
      fetchDataFromId();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(product);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-1xl mx-auto bg-white rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
              <Link
                href={`/dashboard/category/product/${product.categoryId}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </Link>
            </div>

            <form>
              {/* Product Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name*
                </label>
                <input
                  placeholder="Zara Shirt"
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  rows={4}
                ></textarea>
                <span className="text-red-600 text-xs">
                  Provide a detailed description of your product to help
                  customers make informed decisions.
                </span>
              </div>

              {/* Price and Discount Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      placeholder="100"
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="discountPrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Discount Price (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      placeholder="50"
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      value={product.discountPrice}
                      onChange={handleChange}
                      className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Brand and SKU */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Brand
                  </label>
                  <input
                    placeholder="Nike"
                    type="text"
                    id="brand"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    SKU
                  </label>
                  <input
                    placeholder="SKU123"
                    type="text"
                    id="sku"
                    name="sku"
                    value={product.sku}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              {/* Material and Gender - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="material"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Material
                  </label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={product.material}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Cotton, Polyester, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={product.gender} // Ensure fallback to empty string
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
              </div>
              {/* Size Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>

                <div className="flex mb-2">
                  <input
                    name="size"
                    type="text"
                    value={product.size}
                    onChange={handleChange}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter size (e.g. S, M, L)"
                  />
                  {/* <button
                    type="button"
                    onClick={() => {
                      // Prevent adding empty size options
                      if (!size.includes(newSizeOption.trim())) {
                        setSize([...size, newSizeOption.trim()]);
                      }
                      setSize([...size, newSizeOption]);
                      setNewSizeOption("");
                    }}
                    className="px-4 bg-red-500 text-white rounded-r-md"
                  >
                    Add
                  </button> */}
                </div>

                {/* Show added sizes */}
                {/* <div className="flex gap-2 flex-wrap">
                  {size.map((sz, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {sz}
                      <button
                        type="button"
                        onClick={() =>
                          setSize(size.filter((_, i) => i !== idx))
                        }
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div> */}
              </div>
              {/* color options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Options
                </label>

                <div className="flex">
                  <input
                    name="color"
                    type="text"
                    value={product.color}
                    onChange={handleChange}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter color (Red, Blue, Green, etc.)"
                  />
                  {/* <button
                    className="px-4 bg-red-500 text-white rounded-r-md"
                    type="button"
                    onClick={() => {
                      // Prevent adding empty color options
                      if (newColorOption.trim() === "") return;
                      setColor([...color, newColorOption]);
                      setNewColorOption("");
                    }}
                  >
                    Add
                  </button> */}
                </div>
                {/* <div className="flex gap-2 flex-wrap mt-3">
                  {color.map((sz, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {sz}
                      <button
                        type="button"
                        onClick={() =>
                          setColor(color.filter((_, i) => i !== idx))
                        }
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div> */}
              </div>
              {/* Product Images */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images (Max 5)
                </label>

                <div className="flex flex-wrap gap-3">
                  {/* EXISTING images from DB */}
                  {existingImages.map((image, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative w-24 h-24 bg-gray-200 rounded overflow-hidden"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={image}
                        alt={`Existing image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <ConfirmDialog
                          trigger={<Trash2 className="h-4 w-4" />}
                          title="Delete Image"
                          description="Are you sure you want to delete this image? This action cannot be undone."
                          confirmText="Delete"
                          cancelText="Cancel"
                          onConfirm={() => {
                            handleImage(image); // This will be executed if the user confirms
                          }}
                        />
                      </button>
                    </div>
                  ))}
                  {/* NEW uploaded images */}
                  {/* Upload button */}
                  {existingImages.length + productImages.length < 5 && (
                    <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                      <PlusCircle className="text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">
                        Add Image
                      </span>
                      <input
                        type="file"
                        multiple
                        name="images"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                <span className="text-red-600 text-xs mt-2 block">
                  Upload up to 5 high-quality images of your product. First
                  image will be the main display image.
                </span>
              </div>
              {/* Product Specifications */}
              <div className="mb-8">
                <label
                  htmlFor="specifications"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Specifications
                </label>
                <textarea
                  id="specifications"
                  name="specifications"
                  value={product.specifications}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter key specifications in comma-separated format (e.g., Size: Large, Color: Blue, Material: Cotton)"
                  rows={3}
                ></textarea>
              </div>
              {/* Featured and Active Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={product.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Active Product
                  </label>
                </div>
              </div>
              {/* {error && <div className="mb-4 text-red-600 text-sm"> {error}</div>} */}
              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateProduct}
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
};

export default Page;
