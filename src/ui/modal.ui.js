const productModalContent = document.querySelector("#productModalContent");

let productModalInstance = null;

function getProductModalInstance() {
  const productModalElement = document.querySelector("#productModal");

  if (!productModalInstance) {
    productModalInstance = new bootstrap.Modal(productModalElement);
  }

  return productModalInstance;
}

export function openProductModal(product) {
  productModalContent.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title h5">${product.title}</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Cerrar"
      ></button>
    </div>

    <div class="modal-body">
      <div class="row g-4 align-items-center">
        <div class="col-12 col-md-6 text-center">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="img-fluid product-modal__image"
          />
        </div>

        <div class="col-12 col-md-6">
          <p class="text-muted mb-2">${product.category}</p>

          <p class="fs-4 fw-bold text-primary">
            $${product.price}
          </p>

          <p>${product.description}</p>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Cerrar
      </button>

      <button
        type="button"
        class="btn btn-primary"
        id="addToCartFromModalButton"
        data-product-id="${product.id}"
      >
        Agregar al carrito
      </button>
    </div>
  `;

  getProductModalInstance().show();
}

export function closeProductModal() {
  getProductModalInstance().hide();
}

export function initializeProductModalFocusHandler() {
  const productModalElement = document.querySelector("#productModal");

  productModalElement.addEventListener("hide.bs.modal", () => {
    document.activeElement?.blur();
  });
}
