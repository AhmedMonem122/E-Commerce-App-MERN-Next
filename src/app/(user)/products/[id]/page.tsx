import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import ProductReviews from "@/components/ProductReviews/ProductReviews";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import { ProductDetails } from "@/types/productDetails";
import apiServer from "@/app/lib/apiServer.server";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

// ───────────────────────────────────────────
// Fetchers
// ───────────────────────────────────────────

async function fetchProduct(id: string): Promise<ProductDetails | null> {
  try {
    const api = await apiServer();
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
    );
    return data?.data?.product || null;
  } catch {
    return null;
  }
}

async function fetchBrand(id: string): Promise<Brand | null> {
  try {
    const api = await apiServer();
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${id}`
    );
    return data?.data?.brand || null;
  } catch {
    return null;
  }
}

async function fetchCategory(id: string): Promise<Category | null> {
  try {
    const api = await apiServer();
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`
    );
    return data?.data?.category || null;
  } catch {
    return null;
  }
}

// ───────────────────────────────────────────
// Main Page Component
// ───────────────────────────────────────────

export default async function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const { id } = await params; // ⭐ Required in Next.js 16

  const product = await fetchProduct(id);

  if (!product) return notFound();

  // Fetch brand & category in parallel
  const [brand, category] = await Promise.all([
    product.brand ? fetchBrand(product.brand) : null,
    product.category ? fetchCategory(product.category) : null,
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-14">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Product Main Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-[380px] h-[380px] bg-gray-50 rounded-xl border shadow-sm overflow-hidden flex items-center justify-center">
              <Image
                src={product.imageCover || "/images/placeholder.png"}
                alt={product.title}
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {product.title}
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {product.description}
            </p>

            {/* Price & Rating */}
            <div className="flex items-center flex-wrap gap-6 mb-6">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              <span className="text-gray-500 text-sm">
                {product.ratingsQuantity} reviews
              </span>
              <span className="text-yellow-500 font-semibold text-lg">
                {product.ratingsAverage} ★
              </span>
            </div>

            {/* Brand & Category */}
            <div className="flex items-center flex-wrap gap-6 mb-6">
              {brand && (
                <div className="flex items-center space-x-2">
                  {brand.image && (
                    <Image
                      src={brand.image}
                      alt={brand.title}
                      width={28}
                      height={28}
                      className="rounded-full border shadow-sm"
                    />
                  )}
                  <span className="text-gray-700 font-medium text-sm">
                    Brand: {brand.title}
                  </span>
                </div>
              )}

              {category && (
                <div className="flex items-center space-x-2">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={28}
                      height={28}
                      className="rounded-full border shadow-sm"
                    />
                  )}
                  <span className="text-gray-700 font-medium text-sm">
                    Category: {category.title}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.images?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-lg border overflow-hidden shadow-sm bg-gray-50"
                  >
                    <Image
                      src={img}
                      alt={`Product image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-12">
        <Suspense
          fallback={
            <div className="p-6 text-center text-gray-500 bg-gray-50 border rounded-xl">
              Loading reviews…
            </div>
          }
        >
          <ProductReviews productId={product._id} product={product} />
        </Suspense>
      </section>
    </main>
  );
}
