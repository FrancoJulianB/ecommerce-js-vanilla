const categoriesContainer = document.querySelector("#categoriesContainer");

function createCategoryButton(category, selectedCategory) {
  const isSelected = category === selectedCategory;

  return `
    <button
      class="btn ${isSelected ? "btn-primary" : "btn-outline-primary"}"
      type="button"
      data-action="filter-category"
      data-category="${category}"
    >
      ${category}
    </button>
  `;
}

export function renderCategories(categories, selectedCategory = "all") {
  categoriesContainer.innerHTML = `
    <button
      class="btn ${
        selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"
      }"
      type="button"
      data-action="filter-category"
      data-category="all"
    >
      Todos
    </button>

    ${categories
      .map((category) => createCategoryButton(category, selectedCategory))
      .join("")}
  `;
}
