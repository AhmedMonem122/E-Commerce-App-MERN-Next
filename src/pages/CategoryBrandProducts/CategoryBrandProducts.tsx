import FilterSection from "./FilterSection";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
  brandId,
  productsData,
}: {
  brandId: string;
  productsData: ProductsData;
}) {
  const products = productsData?.data?.products || [];

  return (
    <section>
      <FilterSection brandId={brandId} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition">
            <CardContent>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-48 rounded"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500">{product.brand.title}</p>
                <p className="text-primary font-bold">${product.price}</p>
                <p className="text-yellow-500">⭐ {product.ratingsAverage}</p>
                <p className="text-gray-400 text-xs">
                  {product.category.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No products found.</div>
      )}
    </section>
  );
}
