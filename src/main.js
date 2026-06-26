import { getProducts } from "./services/product.service.js";
import { appState } from "./state/app.state.js";
import { renderProducts } from "./ui/product.ui.js";

async function initializeApplication() {
    appState.products = await getProducts();
    appState.filteredProducts = [...appState.products];
    renderProducts(appState.filteredProducts);
}

initializeApplication();