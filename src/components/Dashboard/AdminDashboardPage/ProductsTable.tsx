"use client";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/api/apiClient";
import { Product } from "@/types/product";
import { DataTablePagination } from "../ReusableComponents/DataTable/DataTablePagination";
import { DataTable } from "../ReusableComponents/DataTable/DataTable";
import { Eye, Pencil } from "lucide-react";
import ProductImage from "./ProductImage";
import TableError from "../ReusableComponents/DataTable/TableError";
import EmptyTable from "../ReusableComponents/DataTable/EmptyTable";
import DeleteActionDialog from "../ReusableComponents/DataTable/DeleteActionDialog";

export default function ProductsTable({
  initialData,
}: {
  initialData: Product[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const page = params?.get("page") ?? "1";
  const limit = params?.get("limit") ?? "10";
  const sort = params?.get("sort") ?? "";
  const search = params?.get("search") ?? "";

  const { data, isFetching, isError } = useQuery({
    queryKey: ["products", page, limit, sort, search],
    queryFn: async () => {
      const res = await apiClient.get("/products", {
        params: { page, limit, sort, search },
      });
      return res.data;
    },
    initialData,
  });

  function updateParam(key: string, value: string) {
    const sp = new URLSearchParams(params?.toString());
    sp.set(key, value);
    router.push(`?${sp.toString()}`);
  }

  function toggleSort(field: string) {
    if (sort === field) updateParam("sort", `-${field}`);
    else updateParam("sort", field);
  }

  const products = data?.data?.products ?? [];

  const isEmpty = !isFetching && !isError && products.length === 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search products..."
          defaultValue={search}
          onChange={(e) => updateParam("search", e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isError ? (
        <TableError message="Unable to fetch products. Please try again." />
      ) : isEmpty ? (
        <EmptyTable
          title="No products found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <DataTable<Product>
          headers={[
            {
              label: "Image",
              render: (p) => <ProductImage product={p} />,
            },
            { key: "price", label: "Price", sortable: true },
            { key: "ratingsAverage", label: "Rating", sortable: true },
            {
              label: "Brand",
              render: (p) => p.brand?.title ?? "—",
            },
            {
              label: "Category",
              render: (p) => p.category?.title ?? "—",
            },
          ]}
          data={products}
          sort={sort}
          onSort={toggleSort}
          isLoading={isFetching}
          actions={[
            {
              icon: <Eye className="h-4 w-4" />,
              href: (p) => `/products/${p._id}`,
            },
            {
              icon: <Pencil className="h-4 w-4" />,
              href: (p) => `/admin/dashboard/products/edit/${p._id}`,
            },
            {
              render: (p) => (
                <DeleteActionDialog
                  resource="products"
                  id={p._id}
                  invalidateKey={["products"]}
                  title="Delete product?"
                  onSuccessMessage="Product deleted"
                />
              ),
            },
          ]}
        />
      )}

      <DataTablePagination
        page={data.metadata.currentPage}
        totalPages={data.metadata.numberOfPages}
        limit={Number(limit)}
        onPageChange={(p) => updateParam("page", String(p))}
        onLimitChange={(l) => updateParam("limit", String(l))}
      />
    </div>
  );
}
