"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FilterSection({ brandId }: { brandId: string }) {
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
    router.push(`/brands/${brandId}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-40"
      />
      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Min Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-24"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="ratingsAverage">Rating</option>
      </select>
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  );
}
