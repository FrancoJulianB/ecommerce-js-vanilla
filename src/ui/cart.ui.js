const cartBadge = document.querySelector("#cartBadge");

export function updateCartBadge(cart) {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  cartBadge.textContent = totalQuantity;

  if (totalQuantity === 0) {
    cartBadge.classList.add("d-none");
    return;
  }

  cartBadge.classList.remove("d-none");
}
