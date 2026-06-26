const appToast = document.querySelector("#appToast");
const appToastMessage = document.querySelector("#appToastMessage");

export function showToast(message) {
  appToastMessage.textContent = message;

  const toast = bootstrap.Toast.getOrCreateInstance(appToast, {
    delay: 2500,
  });

  toast.show();
}