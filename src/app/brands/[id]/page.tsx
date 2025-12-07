import { Metadata } from "next";
import CategoryBrandProducts from "@/pages/CategoryBrandProducts/CategoryBrandProducts";
import api from "@/api/apiClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await api.get(`/brands/${id}`);
  const brandName = res?.data?.data?.brand?.title || "Brand";

  return {
    title: brandName,
    description: `Shop products from ${brandName} with best prices and ratings.`,
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

  const res = await api.get(`/brands/${id}/products?${queryString}`);
  return res.data;
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string>;
}) {
  const { id } = await params;
  const productsData = await fetchBrandProducts(id, searchParams);

  return (
    <main className="container mx-auto py-8">
      <CategoryBrandProducts brandId={id} productsData={productsData} />
    </main>
  );
}
