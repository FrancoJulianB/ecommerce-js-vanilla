import { appState } from "../state/app.state.js";
import { renderProducts } from "../ui/product.ui.js";
import { renderCategories } from "../ui/category.ui.js";

export function initializeSearch() {
  document
    .querySelector("#searchInput")
    .addEventListener("input", handleSearchInput);
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