import FilterSection from "./FilterSection";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  brand: { title: string };
  category: { title: string };
}

interface ProductsData {
  data?: {
    products: Product[];
  };
}

export default function CategoryBrandProducts({
  id,
  productsData,
}: {
  id: string;
  productsData: ProductsData;
}) {
  const products = productsData?.data?.products || [];

  return (
    <section className="space-y-8">
      <FilterSection id={id} />

      {/* Products Grid */}
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        gap-6 
        mt-8
      "
      >
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <Card
              className="
                group 
                overflow-hidden 
                rounded-xl 
                shadow-sm 
                hover:shadow-xl 
                transition-all 
                duration-300 
                border border-gray-200
              "
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
                {product.imageCover ? (
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="
                      object-cover 
                      group-hover:scale-110 
                      transition-all 
                      duration-500
                    "
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-500 -mt-1">
                  {product?.brand?.title}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-primary font-bold text-lg">
                    ${product.price}
                  </p>
                  <p className="text-yellow-500 font-medium text-sm">
                    ⭐ {product.ratingsAverage}
                  </p>
                </div>

                <p className="text-gray-400 text-xs">
                  {product?.category?.title}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8 text-lg font-medium">
          No products found.
        </div>
      )}
    </section>
  );
}
