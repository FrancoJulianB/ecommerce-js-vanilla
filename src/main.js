import { getProducts } from "./services/product.service.js";
import { appState } from "./state/app.state.js";
import { renderProducts } from "./ui/product.ui.js";
import { openProductModal, closeProductModal } from "./ui/modal.ui.js";
import { getStoredCart, saveCart } from "./repositories/cart.repository.js";
import { updateCartBadge } from "./ui/cart.ui.js";

function findProductById(productId) {
  return appState.products.find((product) => product.id === productId);
}

function addProductToCart(product) {
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

  saveCart(appState.cart);
  updateCartBadge(appState.cart);
  closeProductModal();

}

function handleProductCatalogClick(event) {
  const button = event.target.closest("[data-action='view-product']");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.productId);
  const selectedProduct = findProductById(productId);

  if (selectedProduct) {
    openProductModal(selectedProduct);
  }
}

function handleModalClick(event) {
  const button = event.target.closest("#addToCartFromModalButton");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.productId);
  const selectedProduct = findProductById(productId);

  if (selectedProduct) {
    addProductToCart(selectedProduct);
  }
}

async function initializeApplication() {
  appState.products = await getProducts();
  appState.filteredProducts = [...appState.products];
  appState.cart = getStoredCart();

  renderProducts(appState.filteredProducts);
  updateCartBadge(appState.cart);

  document
    .querySelector("#productsContainer")
    .addEventListener("click", handleProductCatalogClick);

  document
    .querySelector("#productModalContent")
    .addEventListener("click", handleModalClick);
}

initializeApplication();
