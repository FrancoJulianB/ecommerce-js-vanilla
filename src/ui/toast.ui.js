const appToast = document.querySelector("#appToast");
const appToastMessage = document.querySelector("#appToastMessage");

export function showToast(message, variant = "success") {
  appToast.classList.remove(
    "text-bg-success",
    "text-bg-danger",
    "text-bg-warning",
    "text-bg-primary"
  );

  appToast.classList.add(`text-bg-${variant}`);

  appToastMessage.textContent = message;

  const toast = bootstrap.Toast.getOrCreateInstance(appToast, {
    delay: 2500,
  });

  toast.show();
}