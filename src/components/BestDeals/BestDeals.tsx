import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TopCheapProduct } from "@/types/product";
import Image from "next/image";
import api from "@/api/apiClient";
import Link from "next/link";

export default async function BestDeals() {
  const res = await api.get("/products/top-5-cheap");

  const products = res.data.data.products as TopCheapProduct[];

  return (
    <section className=" mx-auto px-9 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Best Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Error State */}
        {!products && (
          <div className="col-span-full text-center text-red-500">
            Failed to load best deals.
          </div>
        )}

        {/* Products */}
        {products &&
          products.map((product: TopCheapProduct) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <Card className="flex flex-col items-center hover:shadow-lg transition-shadow">
                <CardHeader className="w-full">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {product.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  {product.imageCover ? (
                    <Image
                      src={product?.imageCover}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="h-32 w-32 object-cover rounded mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-green-600">
                      ${product.price}
                    </div>
                    <Badge variant="secondary">Best Deal</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

        {/* Skeleton Loading (SSR fallback, optional) */}
        {!products &&
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="flex flex-col items-center">
              <CardHeader>
                <Skeleton className="h-8 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-32 mb-4" />
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
