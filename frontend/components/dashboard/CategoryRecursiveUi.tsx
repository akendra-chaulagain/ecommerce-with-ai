"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EyeIcon,
  Trash2Icon,
  PlusIcon,
  PackagePlusIcon,
  PencilIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dashboard/dialog";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  categoryImage: string;
  children?: ICategory[];
}

interface ICategoryCardProps {
  category: ICategory;
  onDelete: (categoryId: string) => void;
}

interface ICategoryTreeProps {
  categories: ICategory[];
  onDelete: (categoryId: string) => void;
}

const CategoryItem = ({ category, onDelete }: ICategoryCardProps) => {
  return (
    <div className="ml-4 mt-6 border-l-2 border-gray-200 pl-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        {/* Category Info */}
        <div className="flex items-center gap-4">
          <Image
            src={category.categoryImage}
            alt={category.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-base">{category.name}</p>
            <p className="text-sm text-muted-foreground">
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
            <Button size="sm" variant="secondary" className="gap-1">
              <PlusIcon className="w-4 h-4" />
              Subcategory
            </Button>
          </Link>
          {/* Add Product */}
          {/* dashboard/category/addCategory/addProduct */}
          <Link
            href={`/dashboard/category/addCategory/addProduct?sub_cat_id=${category._id}`}
          >
            <Button size="sm" variant="outline" className="gap-1">
              <PackagePlusIcon className="w-4 h-4" />
              Product
            </Button>
          </Link>
          {/* View */}
          <Link href={`/dashboard/category/${category._id}`}>
            <Button size="sm" variant="outline">
              <EyeIcon className="w-4 h-4" />
            </Button>
          </Link>
          {/* Edit */}
          <Link href={`/dashboard/category/${category._id}`}>
            <Button size="sm" variant="outline">
              <PencilIcon className="w-4 h-4" />
            </Button>
          </Link>
          {/* Delete */}
          <ConfirmDialog
            trigger={
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2Icon className="w-4 h-4" />
              </Button>
            }
            title="Delete Category"
            description="Are you sure you want to permanently delete this category?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => onDelete(category._id)}
          />
        </div>
      </div>

      {/* Recursive Subcategories */}
      {category.children && category.children.length > 0 && (
        <div className="ml-4 mt-2">
          {category.children.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree = ({ categories, onDelete }: ICategoryTreeProps) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      {categories.map((cat) => (
        <CategoryItem key={cat._id} category={cat} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CategoryTree;
