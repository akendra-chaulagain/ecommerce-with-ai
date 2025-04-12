"use client";
import React, { useState } from "react";
import { X, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [specifications, setSpecifications] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();
    // This would contain the API call to save the product
    console.log("Product submitted");
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && productImages.length < 5) {
      // In a real implementation, you'd handle the file and preview
      setProductImages([...productImages, files[0]]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <Link
            href="/dashboard/category"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            <X />
          </Link>
        </div>

        <form>
          {/* Product Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
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
              
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            ></textarea>
            <span className="text-red-600 text-xs">
              Provide a detailed description of your product to help customers
              make informed decisions.
            </span>
          </div>

          {/* Price and Discount Price - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
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
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Category and SubCategory - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                {/* More categories would be populated from your database */}
              </select>
            </div>
            <div>
              <label
                htmlFor="subCategory"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sub Category
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Sub Category</option>
                {/* Sub-categories would be dynamically loaded based on selected category */}
                {category === "electronics" && (
                  <>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                  </>
                )}
                {category === "clothing" && (
                  <>
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="mb-6">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 5)
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {/* Display uploaded images */}
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 bg-gray-200 rounded overflow-hidden"
                >
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(image)}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {/* Upload button */}
              {productImages.length < 5 && (
                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                  <PlusCircle className="text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <span className="text-red-600 text-xs mt-2 block">
              Upload up to 5 high-quality images of your product. First image
              will be the main display image.
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
             
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Enter key specifications in comma-separated format (e.g., Size: Large, Color: Blue, Material: Cotton)"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
