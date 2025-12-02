import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import ProductReviews from "@/components/ProductReviews/ProductReviews";
import api from "@/api/apiClient";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import { ProductDetails } from "@/types/productDetails";

interface ProductDetailsProps {
  params: { id: string };
}

async function fetchProduct(id: string): Promise<ProductDetails | null> {
  try {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
    );
    return data?.data?.product || null;
  } catch {
    return null;
  }
}

async function fetchBrand(brandId: string): Promise<Brand | null> {
  try {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${brandId}`
    );
    return data?.data?.brand || null;
  } catch {
    return null;
  }
}

async function fetchCategory(categoryId: string): Promise<Category | null> {
  try {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}`
    );
    return data?.data?.category || null;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const product = await fetchProduct(params.id);

  if (!product) return notFound();

  const brand = product.brand ? await fetchBrand(product.brand) : null;
  const category = product.category
    ? await fetchCategory(product.category)
    : null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <Image
            src={product.imageCover || "/images/placeholder.png"}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain rounded-lg bg-white border shadow"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-semibold text-primary">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500">
              ({product.ratingsQuantity} reviews)
            </span>
            <span className="text-yellow-500 font-bold">
              {product.ratingsAverage}★
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            {brand && (
              <div className="flex items-center gap-2">
                {brand.image && (
                  <Image
                    src={brand.image}
                    alt={brand.title}
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  Brand: {brand.title}
                </span>
              </div>
            )}
            {category && (
              <div className="flex items-center gap-2">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  Category: {category.title}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.images?.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Product image ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover rounded border"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ProductReviews productId={product?._id} product={product} />
        </Suspense>
      </div>
    </main>
  );
}
