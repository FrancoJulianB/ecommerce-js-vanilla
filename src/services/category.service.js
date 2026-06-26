import { APP_CONFIG } from "../config/app.config.js";

export async function getCategories() {
  try {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error("Error fetching categories.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}