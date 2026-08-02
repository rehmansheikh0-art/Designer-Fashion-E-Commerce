import { Product, Order, Coupon, CartItem, UserProfile } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS } from '../data/mockData';

const KEYS = {
  PRODUCTS: 'aria_vance_products_v1',
  ORDERS: 'aria_vance_orders_v1',
  COUPONS: 'aria_vance_coupons_v1',
  CART: 'aria_vance_cart_v1',
  WISHLIST: 'aria_vance_wishlist_v1',
  USER: 'aria_vance_user_v1'
};

export function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse stored products', e);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
}

export function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse stored orders', e);
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function saveSingleOrder(newOrder: Order) {
  const orders = getStoredOrders();
  const existingIdx = orders.findIndex(o => o.id === newOrder.id);
  if (existingIdx >= 0) {
    orders[existingIdx] = newOrder;
  } else {
    orders.unshift(newOrder);
  }
  saveOrders(orders);
}

export function getStoredCoupons(): Coupon[] {
  try {
    const data = localStorage.getItem(KEYS.COUPONS);
    if (!data) {
      localStorage.setItem(KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
      return INITIAL_COUPONS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_COUPONS;
  }
}

export function saveCoupons(coupons: Coupon[]) {
  localStorage.setItem(KEYS.COUPONS, JSON.stringify(coupons));
}

export function getStoredCart(): CartItem[] {
  try {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
}

export function getStoredWishlist(): string[] {
  try {
    const data = localStorage.getItem(KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveWishlist(wishlist: string[]) {
  localStorage.setItem(KEYS.WISHLIST, JSON.stringify(wishlist));
}

export function getStoredUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : {
      id: 'usr-guest-01',
      name: 'Victoria Vance',
      email: 'victoria@example.com',
      role: 'customer',
      addresses: [
        {
          fullName: 'Victoria Vance',
          email: 'victoria@example.com',
          phone: '+1 (555) 948-2041',
          address: '450 Fifth Avenue, Floor 18',
          city: 'New York',
          state: 'NY',
          zipCode: '10018',
          country: 'United States'
        }
      ]
    };
  } catch (e) {
    return null;
  }
}

export function saveUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.USER);
  }
}
