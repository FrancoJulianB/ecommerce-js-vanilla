import { appState } from "../state/app.state.js";
import {
  getStoredCart,
  saveCart,
  clearStoredCart,
} from "../repositories/cart.repository.js";
import { renderCart, updateCartBadge } from "../ui/cart.ui.js";
import { closeProductModal } from "../ui/modal.ui.js";
import { showToast } from "../ui/toast.ui.js";
import {
  openConfirmClearCartModal,
  closeConfirmClearCartModal,
} from "../ui/confirm-modal.ui.js";

export function initializeCart() {
  appState.cart = getStoredCart();

  updateCartView();

  document
    .querySelector("#cartItemsContainer")
    .addEventListener("click", handleCartClick);

  document
    .querySelector("#clearCartButton")
    .addEventListener("click", handleClearCart);

  document
    .querySelector("#checkoutButton")
    .addEventListener("click", handleCheckout);

  document
    .querySelector("#confirmClearCartButton")
    .addEventListener("click", handleConfirmClearCart);
}

export function addProductToCart(product) {
  const existingCartItem = appState.cart.find((item) => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    appState.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  updateCartView();
  showToast("Product added to cart.");

  document.activeElement?.blur();

  const productModalElement = document.querySelector("#productModal");
  const productModal = bootstrap.Modal.getInstance(productModalElement);

  if (productModal) {
    closeProductModal();
  }
}

function updateCartView() {
  if (appState.cart.length === 0) {
    clearStoredCart();
  } else {
    saveCart(appState.cart);
  }

  updateCartBadge(appState.cart);
  renderCart(appState.cart);
}

function increaseCartItemQuantity(productId) {
  const cartItem = appState.cart.find((item) => item.id === productId);

  if (!cartItem) {
    return;
  }

  cartItem.quantity += 1;
  updateCartView();
}

function decreaseCartItemQuantity(productId) {
  const cartItem = appState.cart.find((item) => item.id === productId);

  if (!cartItem || cartItem.quantity === 1) {
    return;
  }

  cartItem.quantity -= 1;
  updateCartView();
}

function removeCartItem(productId) {
  appState.cart = appState.cart.filter((item) => item.id !== productId);
  updateCartView();
}

function clearCart({ showMessage = true } = {}) {
  appState.cart = [];

  updateCartView();

  if (showMessage) {
    showToast("Cart cleared.", "warning");
  }
}

function handleCartClick(event) {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.productId);

  switch (button.dataset.action) {
    case "increase-cart-item":
      increaseCartItemQuantity(productId);
      break;

    case "decrease-cart-item":
      decreaseCartItemQuantity(productId);
      break;

    case "remove-cart-item":
      removeCartItem(productId);
      break;
  }
}

function handleClearCart() {
  openConfirmClearCartModal();
}

function handleConfirmClearCart() {
  clearCart({ showMessage: true });

  document.activeElement?.blur();
  closeConfirmClearCartModal();
}

function handleCheckout() {
  appState.cart = [];
  updateCartView();

  const cartSidebarElement = document.querySelector("#cartSidebar");
  const cartSidebar = bootstrap.Offcanvas.getInstance(cartSidebarElement);

  cartSidebar.hide();

  showToast("Purchase completed successfully.");
}