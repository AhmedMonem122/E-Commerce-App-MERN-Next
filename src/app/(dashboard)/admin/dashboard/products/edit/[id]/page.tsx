import { editProductAction } from "@/app/actions/productActions/productActions";
import apiServer from "@/app/lib/apiServer.server";
import { getProductFormData } from "@/app/lib/product-form-data";
import { ActionForm } from "@/components/Dashboard/ReusableComponents/Forms/ActionForm";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import { EditProductForm } from "@/types/product-form";
import { ProductDetails } from "@/types/productDetails";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

async function fetchProduct(id: string): Promise<ProductDetails | null> {
  try {
    const api = await apiServer();
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    );
    return data?.data?.product || null;
  } catch {
    return null;
  }
}

export default async function EditProductPage({ params }: ProductDetailsProps) {
  const { id } = await params;

  const product = await fetchProduct(id);

  if (!product) return notFound();

  const { brands, categories } = await getProductFormData();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-600">
        Edit {product?.title} Product
      </h1>

      <ActionForm<EditProductForm>
        action={editProductAction}
        submitLabel="Update Product"
        fields={[
          {
            name: "title",
            label: "Title",
            type: "text",
            defaultValue: product?.title,
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            defaultValue: product?.description,
          },
          {
            name: "price",
            label: "Price",
            type: "number",
            defaultValue: product?.price,
          },
          {
            name: "brand",
            label: "Brand",
            type: "select",
            options: brands.map((b: Brand) => ({
              label: b.title,
              value: b._id,
            })),
            placeholder: "Select a brand",
            defaultValue: product?.brand,
          },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: categories.map((c: Category) => ({
              label: c.title,
              value: c._id,
            })),
            placeholder: "Select a category",
            defaultValue: product?.category,
          },
          {
            name: "imageCover",
            label: "Cover Image",
            type: "file",
            defaultValue: product?.imageCover,
          },
          {
            name: "images",
            label: "Gallery Images",
            type: "file",
            defaultValue: product?.images,
          },
          {
            name: "id",
            type: "hidden",
            defaultValue: id,
          },
        ]}
      />
    </div>
  );
}
