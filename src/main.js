import { getProducts } from "./services/product.service.js";
import { getCategories } from "./services/category.service.js";
import { appState } from "./state/app.state.js";
import { renderProductSkeletons } from "./ui/product.ui.js";
import { initializeCart } from "./controllers/cart.controller.js";
import { initializeCatalog } from "./controllers/catalog.controller.js";
import { initializeSearch } from "./controllers/search.controller.js";
import { initializeCategories } from "./controllers/category.controller.js";

async function initializeApplication() {
  renderProductSkeletons();

  appState.products = await getProducts();
  appState.filteredProducts = [...appState.products];
  appState.categories = await getCategories();

  initializeCart();
  initializeCatalog();
  initializeSearch();
  initializeCategories();
}

initializeApplication();