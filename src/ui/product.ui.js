const productsContainer = document.querySelector("#productsContainer");

function createProductCard(product) {
  return `
    <article class="col-12 col-md-6 col-lg-4">
      <div class="card product-card h-100 shadow-sm">
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
            data-action="view-product"
            data-product-id="${product.id}"
          >
            Ver detalle
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
