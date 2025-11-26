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
import api from "@/api/axios";
import Link from "next/link";

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
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            value={category ? category : undefined}
            onValueChange={(value) => {
              setCategory(value === "all" ? "" : value);
              setPage(1);
            }}
            disabled={loadingCategories}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.data?.categories?.map((cat: Category) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          >
            <SelectTrigger>
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
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Card key={i} className="animate-pulse h-56">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">
          Failed to load brands.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Link key={brand._id} href={`/brands/${brand._id}`}>
                <Card className="hover:shadow-lg transition-shadow h-56 flex flex-col">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 mb-4 relative">
                      <Image
                        src={brand.image || "/images/placeholder.png"}
                        alt={brand.title}
                        fill
                        className="object-contain rounded-full bg-white border"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                      {brand.title}
                    </h3>
                    <p className="text-gray-500 text-sm text-center line-clamp-2">
                      {brand.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
