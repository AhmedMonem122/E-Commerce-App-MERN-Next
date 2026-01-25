import { getProductFormData } from "@/app/lib/product-form-data";
import { ActionForm } from "@/components/Dashboard/ReusableComponents/Forms/ActionForm";
import { Category } from "@/types/category";
import { AddBrandForm } from "@/types/brand-form";
import { addBrandAction } from "@/app/actions/brandActions/brandActions";
import { Product } from "@/types/product";

export default async function AddBrandPage() {
  const { categories, products } = await getProductFormData();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-600">Add Brand</h1>

      <ActionForm<AddBrandForm>
        action={addBrandAction}
        submitLabel="Create Brand"
        fields={[
          { name: "title", label: "Title", type: "text" },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "products",
            label: "Products",
            type: "multi-select",
            options: products.map((p: Product) => ({
              label: p.title,
              value: p._id,
            })),
            placeholder: "Select products",
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
            name: "image",
            label: "Image",
            type: "file",
          },
        ]}
      />
    </div>
  );
}
