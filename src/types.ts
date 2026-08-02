export type CategoryType = 
  | 'Bridal Dresses' 
  | 'Formal Dresses' 
  | 'Casual Wear' 
  | 'Luxury Pret' 
  | 'Party Wear' 
  | 'Kids Collection' 
  | 'Men\'s Collection';

export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom Stitching';

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryType;
  collection: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  fabric: string;
  washingInstructions: string;
  availableSizes: SizeType[];
  availableColors: string[];
  colorHexes: string[];
  stock: number;
  description: string;
  details: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isBridal?: boolean;
  featured?: boolean;
  reviews: ProductReview[];
}

export interface CustomMeasurements {
  bust?: string;
  waist?: string;
  hips?: string;
  height?: string;
  shoulder?: string;
  specialNotes?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  selectedSize: SizeType;
  selectedColor: string;
  quantity: number;
  customMeasurements?: CustomMeasurements;
}

export type OrderStatus = 
  | 'Order Received'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Stitching'
  | 'Quality Check'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface TrackingStep {
  status: OrderStatus;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string; // e.g. ORD-88291
  date: string;
  customerInfo: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  status: OrderStatus;
  trackingHistory: TrackingStep[];
  estimatedDelivery: string;
  courierName?: string;
  trackingNumber?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  expiryDate: string;
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses: ShippingAddress[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  location: string;
}
