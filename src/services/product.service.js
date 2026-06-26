import { APP_CONFIG } from "../config/app.config.js";

export async function getProducts() {
  try {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
