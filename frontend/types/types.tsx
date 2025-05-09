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
  _id: number;
  details?: iProductDetails;
  reviews: iReview[];
  images: [0];
  price: string;
  description: string;
  categoryId: number;
  name: string;
  brand: string;
  color: string;
  discountPrice: number;
  specifications:string
  // images: string;
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
  rating: number;
  quantity: number;
  productId: number;
  gender: string;
  isActive: boolean;
  SKU: number;
  color: string;
  size: string;
  discountPrice?: number | undefined;
  specifications:string
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
  details: iProductDetails;
  length: number | null;
  images: [0];
  price: number;
  categoryId: number;
  brand: string;
  color: string;
}

export interface ApiResponse {
  message: string;
  products: iCategoryResponse; // This is an array of CategoryResponse
}

export interface ICategory {
  _id: string;
  name: string;
  categoryImage: string;
  children: ICategory[];
  products: iProduct[];
}

export interface ICategoryTreeResponse {
  message: string;
  data: ICategory[];
}

export interface iCartResponse {
  userId: string;
  _id: string;
  totalPrice: number;
  items: CartItem[];
  cartDetails: CartItem[];
  productId: string;
  size:string,
  color:string
}

export interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface IShippingAddressDetails {
  name: string;
  contact: string;

  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  _id: string;
}
export interface IShippingAddress {
  data: IShippingAddressDetails;
}
// for order

export interface iOrder {
  deliveryDate: string;
  _id: string;
  totalPrice: number;
  products: iProductDetails[];
  length: number;
  orderStatus: string;
 
}

export interface iReview {
  _id: string;
  comment: string;
  product: string;
  user: string;
}

export interface iReviewResponse {
  data: iReview[];
  length: number;
  totalPages: number;
}

export interface iColor {
  color: string;
  products: iProduct[];
  length: number;
}
