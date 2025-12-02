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
import type { Category } from "@/types/category.d";
import type { Brand } from "@/types/brand.d";
import api from "@/api/apiClient";
import Link from "next/link";

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
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search categories..."
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
            value={brand ? brand : undefined}
            onValueChange={(value) => {
              setBrand(value === "all" ? "" : value);
              setPage(1);
            }}
            disabled={loadingBrands}
          >
            <SelectTrigger>
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

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Card key={i} className="animate-pulse h-56">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">
          Failed to load categories.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`}>
                <Card className="hover:shadow-lg transition-shadow h-56 flex flex-col">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 mb-4 relative">
                      <Image
                        src={category.image || "/images/placeholder.png"}
                        alt={category.title}
                        fill
                        className="object-contain rounded bg-white border"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm text-center line-clamp-2">
                      {category.description}
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
