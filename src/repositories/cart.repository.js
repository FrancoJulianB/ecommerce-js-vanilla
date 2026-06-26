import { APP_CONFIG } from "../config/app.config.js";

export function getStoredCart() {
  const storedCart = localStorage.getItem(APP_CONFIG.STORAGE.CART_KEY);

  if (!storedCart) {
    return [];
  }

  return JSON.parse(storedCart);
}

export function saveCart(cart) {
  localStorage.setItem(APP_CONFIG.STORAGE.CART_KEY, JSON.stringify(cart));
}

export function clearStoredCart() {
  localStorage.removeItem(APP_CONFIG.STORAGE.CART_KEY);
}