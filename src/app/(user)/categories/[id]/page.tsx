import { Metadata } from "next";
import CategoryBrandProducts from "@/pages/CategoryBrandProducts/CategoryBrandProducts";
import { notFound } from "next/navigation";
import apiServer from "@/app/lib/apiServer.server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Fetch brand name for dynamic title
  const api = await apiServer();
  const res = await api.get(`/categories/${id}`);

  const categoryName = res?.data?.data?.category?.title || "Category";
  return {
    title: categoryName,
    description: `Shop products from ${categoryName} with best prices and ratings.`,
  };
}

async function fetchBrandProducts(
  id: string,
  searchParams: Record<string, string>,
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

  try {
    const api = await apiServer();
    const res = await api.get(
      `/categories/${id}/products${search && (sortBy || +minPrice || +rating) ? `?${queryString}` : ""}`,
    );
    return res.data;
  } catch {
    return null;
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const { id } = await props.params;
  const productsData = await fetchBrandProducts(id, searchParams);
  if (!productsData) return notFound();
  return (
    <main className="container mx-auto py-8">
      <CategoryBrandProducts productsData={productsData} />
    </main>
  );
}
