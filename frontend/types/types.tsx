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
  images: [];
  price: string;
  description: string;
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
}

export interface ApiResponse {
  message: string;
  products: iCategoryResponse[]; // This is an array of CategoryResponse
}
export interface iCartResponse {
  userId: string;
  _id: string;
  totalPrice: number;
  items: CartItem[];
  cartDetails: CartItem[];
  productId: string;
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
