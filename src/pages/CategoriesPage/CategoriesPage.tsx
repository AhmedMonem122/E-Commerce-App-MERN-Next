"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import api from "@/api/apiClient";
import Link from "next/link";
import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 8;

const fetchCategories = async ({
  search,
  brand,
  page,
}: {
  search: string;
  brand: string;
  page: number;
}) => {
  const params: Record<string, string | number | undefined> = {
    search: search || undefined,
    brand: brand && brand !== "all" ? brand : undefined,
    page,
    limit: PAGE_SIZE,
  };

  const { data } = await api.get("/categories", { params });
  return data;
};

const fetchBrands = async () => {
  const { data } = await api.get("/brands");
  return data;
};

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);

  const { data: brands, isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", search, brand, page],
    queryFn: () => fetchCategories({ search, brand, page }),
  });

  const categories: Category[] = data?.data?.categories || [];
  const total = data?.metadata?.numberOfPages || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 
                     bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
      >
        Explore Categories
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 mb-10">
        {/* Search */}
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Search Categories
          </label>
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="transition-all focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Brand Filter */}
        <div className="w-full md:w-64">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Filter by Brand
          </label>
          <Select
            value={brand ? brand : undefined}
            onValueChange={(value) => {
              setBrand(value === "all" ? "" : value);
              setPage(1);
            }}
            disabled={loadingBrands}
          >
            <SelectTrigger className="transition-all">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands?.data?.brands?.map((b: Brand) => (
                <SelectItem key={b._id} value={b._id}>
                  {b.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Card key={i} className="p-4 space-y-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-red-500 text-lg py-10 font-semibold">
          ❌ Failed to load categories. Please try again later.
        </div>
      )}

      {/* Categories */}
      {!isLoading && !isError && (
        <>
          {categories.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">
              No categories found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="group"
                >
                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-xl">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 mb-4">
                        <Image
                          src={category.image || "/images/placeholder.png"}
                          alt={category.title}
                          fill
                          className="object-contain rounded-md p-2 
                                     group-hover:scale-105 transition-transform"
                          sizes="128px"
                        />
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {category.title}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-full px-6"
            >
              ← Previous
            </Button>

            <span className="text-gray-700 font-medium">
              Page {page} of {totalPages || 1}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="rounded-full px-6"
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
