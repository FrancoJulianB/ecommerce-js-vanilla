import { getProducts } from "./services/product.service.js";
import { appState } from "./state/app.state.js";

async function initializeApplication() {
    appState.products = await getProducts();
    appState.filteredProducts = [...appState.products];
    console.table(appState.products);
}

initializeApplication();