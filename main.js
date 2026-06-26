import { getProducts } from "./services/product.service.js";

async function initApp() {
  const products = await getProducts();
  console.log(products);
}

initApp();
