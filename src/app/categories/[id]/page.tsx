import { Metadata } from "next";
import CategoryBrandProducts from "@/pages/CategoryBrandProducts/CategoryBrandProducts";
import api from "@/api/apiClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch brand name for dynamic title
  const res = await api.get(`/categories/${params.id}`);

  const categoryName = res?.data?.data?.category?.title || "Category";
  return {
    title: categoryName,
    description: `Shop products from ${categoryName} with best prices and ratings.`,
  };
}

async function fetchBrandProducts(
  id: string,
  searchParams: Record<string, string>
) {
  const {
    search = "",
    sortBy = "",
    minPrice = "0",
    maxPrice = "1000",
    rating = "0",
    page = "1",
  } = searchParams;

  const queryString = new URLSearchParams({
    search,
    sort: sortBy,
    "price[gte]": minPrice,
    "price[lte]": maxPrice,
    "ratingsAverage[gte]": rating,
    page,
  }).toString();

  const res = await api.get(`/categories/${id}/products?${queryString}`);
  return res.data;
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string>;
}) {
  const productsData = await fetchBrandProducts(params.id, searchParams);

  return (
    <main className="container mx-auto py-8">
      <CategoryBrandProducts brandId={params.id} productsData={productsData} />
    </main>
  );
}
