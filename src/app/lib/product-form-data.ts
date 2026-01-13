import apiServer from "./apiServer.server";

export async function getProductFormData() {
  const api = await apiServer();
  const [brandsRes, categoriesRes] = await Promise.all([
    api.get("/brands"),
    api.get("/categories"),
  ]);

  return {
    brands: brandsRes.data.data.brands,
    categories: categoriesRes.data.data.categories,
  };
}
