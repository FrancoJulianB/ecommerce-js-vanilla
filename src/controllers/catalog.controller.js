import { appState } from "../state/app.state.js";
import { renderProducts } from "../ui/product.ui.js";
import {
  openProductModal,
  initializeProductModalFocusHandler,
} from "../ui/modal.ui.js";
import { addProductToCart } from "./cart.controller.js";

export function initializeCatalog() {
  renderProducts(appState.filteredProducts);
  initializeProductModalFocusHandler();

  document
    .querySelector("#productsContainer")
    .addEventListener("click", handleProductCatalogClick);

  document
    .querySelector("#productModalContent")
    .addEventListener("click", handleModalClick);
}

function findProductById(productId) {
  return appState.products.find((product) => product.id === productId);
}

function handleProductCatalogClick(event) {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.productId);
  const selectedProduct = findProductById(productId);

  if (!selectedProduct) {
    return;
  }

  if (button.dataset.action === "add-product-to-cart") {
    event.stopPropagation();
    addProductToCart(selectedProduct);
    return;
  }

  if (button.dataset.action === "view-product") {
    openProductModal(selectedProduct);
  }
}

function handleModalClick(event) {
  const button = event.target.closest("#addToCartFromModalButton");

  if (!button) {
    return;
  }

  button.blur();

  const productId = Number(button.dataset.productId);
  const selectedProduct = findProductById(productId);

  if (selectedProduct) {
    addProductToCart(selectedProduct);
  }
}