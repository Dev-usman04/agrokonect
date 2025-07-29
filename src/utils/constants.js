export const USER_TYPES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  ADMIN: 'admin'
};

export const PRODUCT_CATEGORIES = [
  'all',
  'Vegetables',
  'Fruits', 
  'Grains',
  'Tubers',
  'Livestock'
];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const MESSAGE_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  ORDER: 'order',
  MARKET: 'market'
};

export const NOTIFICATION_COLORS = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  order: 'bg-purple-100 text-purple-800',
  market: 'bg-indigo-100 text-indigo-800'
};