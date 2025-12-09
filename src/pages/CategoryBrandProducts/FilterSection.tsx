"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FilterSection({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [minPrice, setMinPrice] = useState(
    searchParams?.get("minPrice") || "0"
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams?.get("maxPrice") || "1000"
  );
  const [rating, setRating] = useState(searchParams?.get("rating") || "0");
  const [sortBy, setSortBy] = useState(searchParams?.get("sortBy") || "");

  const handleFilter = () => {
    const params = new URLSearchParams({
      search,
      minPrice,
      maxPrice,
      rating,
      sortBy,
    });

    router.push(`/categories/${id}?${params.toString()}`);
  };

  return (
    <div
      className="
      bg-white 
      p-5 
      rounded-xl 
      shadow-sm 
      border 
      border-gray-200 
      flex 
      flex-wrap 
      gap-4 
      items-end
    "
    >
      {/* Search */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Search</label>
        <Input
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-40 sm:w-52"
        />
      </div>

      {/* Min Price */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Min Price</label>
        <Input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-24"
        />
      </div>

      {/* Max Price */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Max Price</label>
        <Input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-24"
        />
      </div>

      {/* Rating */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Min Rating</label>
        <Input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-24"
        />
      </div>

      {/* Sort */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            border 
            rounded-md 
            px-3 
            py-2 
            w-36 
            text-sm 
            bg-white
          "
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="ratingsAverage">Rating</option>
        </select>
      </div>

      {/* Apply Button */}
      <Button onClick={handleFilter} className="mt-2 w-full sm:w-auto">
        Apply Filters
      </Button>
    </div>
  );
}
