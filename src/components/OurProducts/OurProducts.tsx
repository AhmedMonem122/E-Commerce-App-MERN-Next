"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Image from "next/image";
import api from "@/api/axios";
import Link from "next/link";

const fetchProducts = async ({
  search,
  page,
  sort,
}: {
  search: string;
  page: number;
  sort: string;
}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (sort) params.append("sort", sort);

  const res = await api.get(`/products?${params.toString()}`);
  return res.data;
};

const SORT_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Description", value: "description" },
  { label: "Price", value: "price" },
  { label: "Ratings", value: "ratingsAverage" },
];

export default function OurProducts() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", { search, page, sort }],
    queryFn: () => fetchProducts({ search, page, sort }),
  });

  const products: Product[] = data?.data?.products || [];
  const totalPages = data?.metadata?.numberOfPages || 1;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Our Products
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2 items-center">
          <label htmlFor="sort" className="font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          Search
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="flex flex-col items-center p-6 w-full">
                <CardHeader>
                  <Skeleton className="h-32 w-32 mb-4 rounded-lg" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))
          : products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <Card className="flex flex-col items-center p-6 hover:shadow-xl transition-shadow bg-white rounded-xl">
                  <CardHeader className="flex flex-col items-center w-full">
                    <div className="mb-4">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover border-2 border-gray-200 shadow"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
                      {product.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-500 mb-2">{product.description}</p>
                    <div className="flex justify-center gap-2 mb-2">
                      <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                        ${product.price}
                      </span>
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">
                        {product.ratingsAverage} ★
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <div className="text-center text-red-500 mt-6">
          Failed to load products.
        </div>
      )}
    </section>
  );
}
