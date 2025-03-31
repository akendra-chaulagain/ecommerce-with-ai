export interface User {
  _id: string;
  name: string;
  email: string;
  avtar?: string; // Optional field for avatar, adjust based on actual API response
  contact?: number;
  role?: string;
  rating: number;
}

export interface iReview {
  _id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userdata?: User;
}

export interface iProduct {
  _id: string;
  details?: iProductDetails;
  reviews: iReview[];
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
  rating:number
}

export interface iReview {
  _id: string;
  user: string;
  product: string;
  comment: string;
  rating: number;
  length: number;
  userDetails: User;
}

// Define your export interfaces for products and category
export interface iCategoryResponse {
  _id: string;
  categoryImage: string;
  name: string;
  description: string;
  products: iProduct[];
  details:iProductDetails
}

export interface ApiResponse {
  message: string;
  products: iCategoryResponse[]; // This is an array of CategoryResponse
}
