const confirmClearCartModalElement = document.querySelector(
  "#confirmClearCartModal"
);

confirmClearCartModalElement.addEventListener("hide.bs.modal", () => {
  document.activeElement?.blur();
});

export function openConfirmClearCartModal() {
  const modal = bootstrap.Modal.getOrCreateInstance(confirmClearCartModalElement);
  modal.show();
}

export function closeConfirmClearCartModal() {
  const modal = bootstrap.Modal.getOrCreateInstance(confirmClearCartModalElement);
  modal.hide();
}