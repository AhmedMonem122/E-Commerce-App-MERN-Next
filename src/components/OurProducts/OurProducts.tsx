"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import api from "@/api/apiClient";
import { Product } from "@/types/product";

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
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Our Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-xl shadow-sm bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={() => refetch()}
          variant="default"
          className="rounded-xl px-6"
        >
          Apply
        </Button>
      </div>

      {/* Product Grid */}
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
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="p-6 rounded-2xl shadow bg-white flex flex-col items-center"
              >
                <CardHeader className="flex items-center flex-col">
                  <Skeleton className="h-32 w-32 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-28" />
                </CardContent>
              </Card>
            ))
          : products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <Card
                  className="
                    group 
                    p-6 
                    rounded-2xl 
                    bg-white 
                    shadow-sm 
                    border 
                    hover:shadow-2xl 
                    hover:border-blue-500/40 
                    transition-all 
                    duration-300 
                    cursor-pointer 
                    flex flex-col 
                    items-center
                  "
                >
                  <CardHeader className="flex items-center flex-col">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="
                          rounded-lg 
                          object-cover 
                          border-2 
                          border-gray-200 
                          group-hover:border-blue-500/60 
                          transition-all 
                          duration-300
                        "
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                      {product.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full shadow-sm">
                        ${product.price}
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-xs rounded-full shadow-sm">
                        {product.ratingsAverage} ★
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-12">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-xl"
        >
          Previous
        </Button>

        <span className="px-6 py-2 bg-gray-100 rounded-xl text-gray-700 font-medium">
          Page {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-xl"
        >
          Next
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500 mt-6 text-lg font-medium">
          Failed to load products.
        </p>
      )}
    </section>
  );
}
