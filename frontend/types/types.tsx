export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string; // Optional field for avatar, adjust based on actual API response
  contact?: number;
  role?: string;
}

export interface iProduct {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  // iProductDetails?:iProduct;
  productDetails?: iProductDetails[];
  reviews: iReview
}

export interface apiResponse {
  message: string;
  data: iProduct[];
}

export interface iProductDetails {
  _id: string;
  categoryId: string;
  description: string;
  images: string[];
  name: string;
  price: number;
}

export interface iReview {
  _id: string;
  user: string;
  product: string;
  comment: string;
  rating: number;
  length:number;
  userDetails:User
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



