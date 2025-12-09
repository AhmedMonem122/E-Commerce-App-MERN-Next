import { Metadata } from "next";
import CategoryBrandProducts from "@/pages/CategoryBrandProducts/CategoryBrandProducts";
import api from "@/api/apiClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Fetch brand name for dynamic title
  const res = await api.get(`/categories/${id}`);

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

export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const { id } = await props.params;
  const productsData = await fetchBrandProducts(id, searchParams);

  return (
    <main className="container mx-auto py-8">
      <CategoryBrandProducts brandId={id} productsData={productsData} />
    </main>
  );
}
