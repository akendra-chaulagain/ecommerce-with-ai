export interface iProduct {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export interface apiResponse {
  message: string;
  data:iProduct ;
}

// Define your export interfaces for products and category
export interface iCategoryResponse {
  _id: string;
  categoryImage: string;
  name: string;
  description: string;
  products: iProduct[];
}

export interface ApiResponse {
  message: string;
  products: iCategoryResponse[]; // This is an array of CategoryResponse
}
