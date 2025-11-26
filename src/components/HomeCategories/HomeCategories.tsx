import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Category } from "@/types/category";
import api from "@/api/axios";
import Link from "next/link";

// Helper to fetch categories server-side
async function getCategories() {
  try {
    // Use absolute URL if needed for SSR, otherwise relative works if you proxy
    const res = await api.get("/categories");
    return res.data.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
}

export default async function HomeCategories() {
  const categories = await getCategories();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Loading Skeleton */}
        {!categories &&
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="flex flex-col items-center p-6">
              <CardHeader>
                <Skeleton className="h-24 w-24 mb-4 rounded-full" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}

        {/* Error State */}
        {categories === null && (
          <div className="col-span-full text-center text-red-500">
            Failed to load categories.
          </div>
        )}

        {/* Categories */}
        {categories &&
          categories.map((category: Category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <Card className="flex flex-col items-center p-6 hover:shadow-xl transition-shadow bg-white rounded-xl">
                <CardHeader className="flex flex-col items-center w-full">
                  <div className="mb-4">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-2 border-gray-200 shadow"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">
                    {category.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-500 mb-4">{category.description}</p>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    {category.products.length} Products
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </section>
  );
}
