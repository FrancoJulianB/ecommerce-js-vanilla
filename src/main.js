import { getProducts } from "./services/product.service.js";
import { appState } from "./state/app.state.js";
import { renderProducts } from "./ui/product.ui.js";
import { openProductModal } from "./ui/modal.ui.js";

function findProductById(productId) {
  return appState.products.find((product) => product.id === productId);
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

async function initializeApplication() {
  appState.products = await getProducts();
  appState.filteredProducts = [...appState.products];

  renderProducts(appState.filteredProducts);

  document
    .querySelector("#productsContainer")
    .addEventListener("click", handleProductCatalogClick);
}

initializeApplication();
