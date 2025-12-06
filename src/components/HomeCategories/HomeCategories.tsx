import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Category } from "@/types/category";
import api from "@/api/apiClient";
import Link from "next/link";

// Fetch Categories
async function getCategories() {
  try {
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
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Shop by Category
      </h2>

      {/* Grid */}
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-10
      "
      >
        {/* Loading Skeleton */}
        {!categories &&
          Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="p-6 rounded-2xl shadow bg-white flex flex-col items-center"
            >
              <CardHeader className="flex items-center flex-col">
                <Skeleton className="h-28 w-28 rounded-full mb-4" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-28" />
              </CardContent>
            </Card>
          ))}

        {/* Error State */}
        {categories === null && (
          <div className="col-span-full text-center text-red-500 text-lg font-medium">
            Failed to load categories.
          </div>
        )}

        {/* Categories */}
        {categories &&
          categories.map((category: Category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <Card
                className="
                  group 
                  p-6 
                  rounded-2xl 
                  bg-white 
                  shadow-sm 
                  border 
                  hover:shadow-xl 
                  hover:border-blue-500/40 
                  transition-all 
                  duration-300 
                  cursor-pointer 
                  flex flex-col 
                  items-center
                "
              >
                <CardHeader className="flex items-center flex-col">
                  {/* Image */}
                  <div
                    className="
                      mb-4 
                      relative 
                      size-28
                    "
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="
                        rounded-full 
                        object-cover 
                        border-2 
                        border-gray-200 
                        group-hover:border-blue-500/60 
                        transition-all 
                        duration-300
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-xl 
                      font-semibold 
                      text-gray-900 
                      text-center
                    "
                  >
                    {category.title}
                  </h3>
                </CardHeader>

                <CardContent className="text-center">
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Products Count */}
                  <span
                    className="
                      inline-block 
                      bg-blue-100 
                      text-blue-700 
                      text-xs 
                      px-3 
                      py-1 
                      rounded-full 
                      font-medium
                      shadow-sm
                    "
                  >
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
