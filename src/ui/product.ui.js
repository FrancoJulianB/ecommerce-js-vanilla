const productsContainer = document.querySelector("#productsContainer");

function createProductCard(product) {
  return `
    <article
      class="col-12 col-md-6 col-lg-4"
    >
        <div
          class="card product-card h-100 shadow-sm"
          data-action="view-product"
          data-product-id="${product.id}"
        >
        <img
          src="${product.image}"
          class="card-img-top product-card__image"
          alt="${product.title}"
        />

        <div class="card-body d-flex flex-column">
          <h5 class="card-title">
            ${product.title}
          </h5>

          <p class="fw-bold fs-5 text-primary mt-auto">
            $${product.price}
          </p>

            <button
              class="btn btn-primary mt-2"
              data-action="add-product-to-cart"
              data-product-id="${product.id}"
            >
              Add to cart
            </button>
        </div>
      </div>
    </article>
  `;
}

export function renderProducts(products) {
  productsContainer.innerHTML = products
    .map(createProductCard)
    .join("");
}

export function renderProductSkeletons(quantity = 6) {
  const skeletons = Array.from({ length: quantity })
    .map(
      () => `
        <article class="col-12 col-md-6 col-lg-4">
          <div class="card product-card h-100 shadow-sm" aria-hidden="true">
            <div class="skeleton skeleton-image"></div>

            <div class="card-body">
              <div class="skeleton skeleton-title mb-3"></div>
              <div class="skeleton skeleton-text mb-2"></div>
              <div class="skeleton skeleton-text skeleton-text-short mb-4"></div>
              <div class="skeleton skeleton-button"></div>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  productsContainer.innerHTML = skeletons;
}