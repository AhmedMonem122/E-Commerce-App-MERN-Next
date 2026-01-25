import apiServer from "./apiServer.server";

export async function getProductFormData() {
  const api = await apiServer();
  const [brandsRes, categoriesRes, productsRes] = await Promise.all([
    api.get("/brands"),
    api.get("/categories"),
    api.get("/products"),
  ]);

  return {
    brands: brandsRes.data.data.brands,
    categories: categoriesRes.data.data.categories,
    products: productsRes.data.data.products,
  };
}
