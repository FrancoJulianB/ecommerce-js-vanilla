import { getProducts } from "./services/product.service.js";
import { appState } from "./state/app.state.js";
import { renderProducts } from "./ui/product.ui.js";
import { openProductModal, closeProductModal } from "./ui/modal.ui.js";
import { getStoredCart, saveCart, clearStoredCart } from "./repositories/cart.repository.js";
import { renderCart, updateCartBadge } from "./ui/cart.ui.js";
import { showToast } from "./ui/toast.ui.js";
import { getCategories } from "./services/category.service.js";
import { renderCategories } from "./ui/category.ui.js";

function findProductById(productId) {
  return appState.products.find((product) => product.id === productId);
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

  updateCartView();
  closeProductModal();
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

function clearCart() {
  appState.cart = [];

  updateCartView();
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

  button.blur();

  const productId = Number(button.dataset.productId);
  const selectedProduct = findProductById(productId);

  if (selectedProduct) {
    addProductToCart(selectedProduct);
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
  clearCart();
}

function handleCheckout() {
  appState.cart = [];
  updateCartView();

  const cartSidebarElement = document.querySelector("#cartSidebar");
  const cartSidebar = bootstrap.Offcanvas.getInstance(cartSidebarElement);

  cartSidebar.hide();

  showToast("Compra finalizada correctamente.");
}

function handleSearchInput(event) {
  const searchText = event.target.value.toLowerCase().trim();

  appState.selectedCategory = "all";

  appState.filteredProducts = appState.products.filter((product) =>
    product.title.toLowerCase().includes(searchText)
  );

  renderProducts(appState.filteredProducts);
  renderCategories(appState.categories, appState.selectedCategory);
}

function handleCategoryClick(event) {
  const button = event.target.closest("[data-action='filter-category']");

  if (!button) {
    return;
  }

  const selectedCategory = button.dataset.category;

  appState.selectedCategory = selectedCategory;

  if (selectedCategory === "all") {
    appState.filteredProducts = [...appState.products];
  } else {
    appState.filteredProducts = appState.products.filter(
      (product) => product.category === selectedCategory
    );
  }

  document.querySelector("#searchInput").value = "";

  renderProducts(appState.filteredProducts);
  renderCategories(appState.categories, appState.selectedCategory);
}

async function initializeApplication() {
  appState.products = await getProducts();
  appState.filteredProducts = [...appState.products];
  appState.cart = getStoredCart();
  appState.categories = await getCategories();

  renderProducts(appState.filteredProducts);
  updateCartBadge(appState.cart);
  renderCart(appState.cart);
  renderCategories(appState.categories, appState.selectedCategory);

  document
    .querySelector("#productsContainer")
    .addEventListener("click", handleProductCatalogClick);

  document
    .querySelector("#productModalContent")
    .addEventListener("click", handleModalClick);

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
  .querySelector("#searchInput")
  .addEventListener("input", handleSearchInput);

  document
  .querySelector("#categoriesContainer")
  .addEventListener("click", handleCategoryClick);
}

initializeApplication();
