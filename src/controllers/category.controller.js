import { appState } from "../state/app.state.js";
import { renderProducts } from "../ui/product.ui.js";
import { renderCategories } from "../ui/category.ui.js";

export function initializeCategories() {
  renderCategories(appState.categories, appState.selectedCategory);

  document
    .querySelector("#categoriesContainer")
    .addEventListener("click", handleCategoryClick);
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