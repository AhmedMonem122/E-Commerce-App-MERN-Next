import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TopCheapProduct } from "@/types/product";
import Image from "next/image";
import api from "@/api/apiClient";
import Link from "next/link";

export default async function BestDeals() {
  const res = await api.get("/products/top-5-cheap");
  const products = res.data?.data?.products as TopCheapProduct[];

  return (
    <section className="container mx-auto px-6 lg:px-12 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-md">
          Best Deals
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Top picks with unbeatable prices — updated daily.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Error State */}
        {!products && (
          <div className="col-span-full text-center text-red-500 text-lg">
            Failed to load best deals.
          </div>
        )}

        {/* Product Cards */}
        {products &&
          products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <Card className="group cursor-pointer rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Product Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="100%"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Best Deal Badge */}
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white shadow-lg">
                    Best Deal
                  </Badge>
                </div>

                {/* Card Content */}
                <CardHeader className="px-0 pt-4 pb-2">
                  <div className="mx-auto flex items-center justify-center w-[170px] text-nowrap">
                    <h3
                      title={product.title}
                      className="font-semibold text-sm md:text-base line-clamp-2 text-center text-ellipsis"
                    >
                      {product.title}
                    </h3>
                  </div>
                </CardHeader>

                <CardContent className="pb-4 px-4">
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-bold text-primary">
                      ${product.price}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

        {/* Skeleton Loading */}
        {!products &&
          Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              className="rounded-xl overflow-hidden border shadow-sm"
            >
              <div className="w-full h-48">
                <Skeleton className="h-full w-full" />
              </div>

              <CardHeader className="px-4 pt-4 pb-2">
                <Skeleton className="h-5 w-32" />
              </CardHeader>

              <CardContent className="px-4 pb-4">
                <Skeleton className="h-6 w-20" />
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
