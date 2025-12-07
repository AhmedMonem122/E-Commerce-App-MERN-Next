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
import type { Brand } from "@/types/brand.d";
import type { Category } from "@/types/category.d";
import api from "@/api/apiClient";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 8;

const fetchBrands = async ({
  search,
  category,
  sort,
  page,
}: {
  search: string;
  category: string;
  sort: string;
  page: number;
}) => {
  const params: Record<string, string | number | undefined> = {
    search: search || undefined,
    category: category && category !== "all" ? category : undefined,
    sort: sort || undefined,
    page,
    limit: PAGE_SIZE,
  };
  const { data } = await api.get("/brands", { params });
  return data;
};

const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands", search, category, sort, page],
    queryFn: () => fetchBrands({ search, category, sort, page }),
  });

  const brands: Brand[] = data?.data?.brands || [];
  const total = data?.metadata?.numberOfPages || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Browse <span className="text-primary">Brands</span>
      </h1>

      {/* FILTER BAR */}
      <div className="bg-white/70 backdrop-blur-md border shadow-sm p-4 rounded-xl mb-10 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search brands..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1"
        />

        {/* CATEGORY FILTER */}
        <Select
          value={category ? category : undefined}
          onValueChange={(value) => {
            setCategory(value === "all" ? "" : value);
            setPage(1);
          }}
          disabled={loadingCategories}
        >
          <SelectTrigger className="md:w-56">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.data?.categories?.map((cat: Category) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SORT */}
        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="md:w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="-title">Title (Z-A)</SelectItem>
            <SelectItem value="createdAt">Newest</SelectItem>
            <SelectItem value="-createdAt">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Card key={i} className="p-5 animate-pulse">
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center text-red-500 py-12 text-lg">
          Failed to load brands. Please try again.
        </div>
      )}

      {/* LIST */}
      {!isLoading && !isError && (
        <>
          {brands.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-lg">
              No brands found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {brands.map((brand) => (
                <Link key={brand._id} href={`/brands/${brand._id}`}>
                  <Card className="h-60 group relative overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={brand.image || "/images/placeholder.png"}
                          alt={brand.title}
                          fill
                          className="object-contain rounded-full bg-white border"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {brand.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {brand.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6"
            >
              Previous
            </Button>

            <span className="text-gray-700 text-sm">
              Page <span className="font-semibold text-primary">{page}</span> of{" "}
              {totalPages || 1}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-6"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
