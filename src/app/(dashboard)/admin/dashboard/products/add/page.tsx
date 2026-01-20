import { addProductAction } from "@/app/actions/productActions/productActions";
import { getProductFormData } from "@/app/lib/product-form-data";
import { ActionForm } from "@/components/Dashboard/ReusableComponents/Forms/ActionForm";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";
import { AddProductForm } from "@/types/product-form";

export default async function AddProductPage() {
  const { brands, categories } = await getProductFormData();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-600">Add Product</h1>

      <ActionForm<AddProductForm>
        action={addProductAction}
        submitLabel="Create Product"
        fields={[
          { name: "title", label: "Title", type: "text" },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "price",
            label: "Price",
            type: "number",
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
          },
          {
            name: "imageCover",
            label: "Cover Image",
            type: "file",
          },
          {
            name: "images",
            label: "Gallery Images",
            type: "file",
          },
        ]}
      />
    </div>
  );
}
