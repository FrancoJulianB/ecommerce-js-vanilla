const cartBadge = document.querySelector("#cartBadge");
const cartItemsContainer = document.querySelector("#cartItemsContainer");
const cartTotal = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector("#checkoutButton");
const clearCartButton = document.querySelector("#clearCartButton");

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function createCartItem(cartItem) {
  return `
    <article class="d-flex gap-3 border-bottom py-3">
      <img
        src="${cartItem.image}"
        alt="${cartItem.title}"
        class="cart-item__image"
      />

      <div class="flex-grow-1">
        <h3 class="h6 mb-2">${cartItem.title}</h3>

        <p class="mb-2 fw-bold">
          $${(cartItem.price * cartItem.quantity).toFixed(2)}
        </p>

        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-sm btn-outline-secondary"
            data-action="decrease-cart-item"
            data-product-id="${cartItem.id}"
            ${cartItem.quantity === 1 ? "disabled" : ""}
          >
            -
          </button>

          <span>${cartItem.quantity}</span>

          <button
            class="btn btn-sm btn-outline-secondary"
            data-action="increase-cart-item"
            data-product-id="${cartItem.id}"
          >
            +
          </button>

          <button
            class="btn btn-sm btn-outline-danger ms-auto"
            data-action="remove-cart-item"
            data-product-id="${cartItem.id}"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  `;
}

export function updateCartBadge(cart) {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  cartBadge.textContent = totalQuantity;

  if (totalQuantity === 0) {
    cartBadge.classList.add("d-none");
    return;
  }

  cartBadge.classList.remove("d-none");
}

export function renderCart(cart) {
  if (!cart.length) {
    cartItemsContainer.innerHTML = `
      <p class="text-center text-muted">
        The cart is empty.
      </p>
    `;

    cartTotal.textContent = "0.00";
    checkoutButton.disabled = true;
    clearCartButton.disabled = true;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(createCartItem).join("");
  cartTotal.textContent = calculateCartTotal(cart).toFixed(2);

  checkoutButton.disabled = false;
  clearCartButton.disabled = false;
}
