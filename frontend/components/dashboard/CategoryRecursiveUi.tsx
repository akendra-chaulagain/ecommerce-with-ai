"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EyeIcon,
  Trash2Icon,
  PlusIcon,
  PackagePlusIcon,
  PencilIcon,
  ChevronDown,
  ChevronRight,
  Search,
  LayoutGrid,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dashboard/dialog";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  categoryImage: string;
  children?: ICategory[];
  productCount?: number;
}

interface ICategoryCardProps {
  category: ICategory;
  onDelete: (categoryId: string) => void;
  depth: number;
}

interface ICategoryTreeProps {
  categories: ICategory[];
  onDelete: (categoryId: string) => void;
}

const CategoryItem = ({
  category,
  onDelete,
  depth = 0,
}: ICategoryCardProps) => {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className={`${depth > 0 ? "ml-6 mt-3" : "mt-4"}`}>
      <div
        className={`bg-white rounded-lg border hover:border-red-700-200 transition-colors ${
          depth > 0 ? "border-l-4 border-l-red-700-400" : ""
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          {/* Category Info */}
          <div className="flex items-center gap-3">
            {hasChildren && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                {expanded ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-7"></div>}

            <div className="relative">
              <Image
                src={category.categoryImage}
                alt={category.name}
                width={48}
                height={48}
                className="rounded-md object-cover shadow-sm"
              />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                {category.name}

                <span>
                  {hasChildren && (
                    <span className="text-xs bg-red-700-100 bg-red-100 text-red-600 rounded-full px-2 py-1 ml-2">
                      ( {category.children?.length} subcategories )
                    </span>
                  )}
                  {/* Product Count Badge */}
                </span>
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                {category.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* Add Subcategory */}
            <Link
              href={`/dashboard/category/addCategory?add_subCat=${category._id}`}
            >
              <Button
                size="sm"
                variant="secondary"
                className="gap-1 bg-red-700-50 hover:bg-red-700-100 text-red-700"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Subcategory</span>
              </Button>
            </Link>

            {/* Add Product */}
           
            <div className="flex bg-gray-100 rounded-md divide-x divide-gray-200">
              {/* View Products */}
              <Link href={`/dashboard/category/product/${category._id}`}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-none rounded-l-md hover:bg-gray-200"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">View All Products</span>
                </Button>
              </Link>

              {/* Edit */}
              <Link href={`/dashboard/category/edit/${category._id}`}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-none hover:bg-gray-200"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
              </Link>

              {/* Delete */}
              {hasChildren ? (
                ""
              ) : (
                <ConfirmDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 rounded-none rounded-r-md hover:bg-red-50"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  }
                  title="Are you sure you want to delete"
                  description={` "${category.name}" This action cannot be undone.`}
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => onDelete(category._id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recursive Subcategories */}
      {hasChildren && expanded && (
        <div className="border-l-2 border-gray-200 ml-6 pl-2">
          {category.children?.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree = ({ categories, onDelete }: ICategoryTreeProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full mx-auto rounded-xl border shadow-sm bg-white">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b bg-gray-50">
        {/* Tabs */}
        <div className="flex border rounded-md overflow-hidden bg-white shadow-sm">
          <span
            className={`px-4 py-2 text-sm font-medium 
            `}
          >
            All Categories
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-9 pr-4 py-2 w-full border rounded-md text-sm  outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:text-white focus:outline-none "
          >
            Search
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-50">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {categories.length}
                </p>
              </div>
              <div className="p-3 bg-red-700-100 rounded-full">
                <Tag className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Subcategories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {categories.reduce(
                    (sum, cat) => sum + (cat.children?.length || 0),
                    0
                  )}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <LayoutGrid className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">142</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <PackagePlusIcon className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Category tree */}
        <div className="space-y-1">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategoryItem
                key={cat._id}
                category={{
                  ...cat,
                  productCount: Math.floor(Math.random() * 50) + 5,
                }} // Example product count
                onDelete={onDelete}
                depth={0}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Tag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No categories found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start organizing your products by creating your first category.
              </p>
              <Link href="/dashboard/category/addCategory">
                <Button className="gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Create First Category
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTree;
