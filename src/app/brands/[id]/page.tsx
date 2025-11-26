import { Metadata } from "next";
import CategoryBrandProducts from "@/pages/CategoryBrandProducts/CategoryBrandProducts";
import api from "@/api/axios";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch brand name for dynamic title
  const res = await api.get(`/brands/${params.id}`);

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
