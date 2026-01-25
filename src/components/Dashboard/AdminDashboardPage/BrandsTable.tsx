"use client";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/api/apiClient";
import { DataTablePagination } from "../ReusableComponents/DataTable/DataTablePagination";
import { DataTable } from "../ReusableComponents/DataTable/DataTable";
import { Eye, Pencil } from "lucide-react";
import TableError from "../ReusableComponents/DataTable/TableError";
import EmptyTable from "../ReusableComponents/DataTable/EmptyTable";
import DeleteActionDialog from "../ReusableComponents/DataTable/DeleteActionDialog";
import { Brand } from "@/types/brand";
import DataTableImage from "../ReusableComponents/DataTable/DataTableImage";

export default function BrandsTable({ initialData }: { initialData: Brand[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const page = params?.get("page") ?? "1";
  const limit = params?.get("limit") ?? "10";
  const sort = params?.get("sort") ?? "";
  const search = params?.get("search") ?? "";

  const { data, isFetching, isError } = useQuery({
    queryKey: ["brands", page, limit, sort, search],
    queryFn: async () => {
      const res = await apiClient.get("/brands", {
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

  const brands = data?.data?.brands ?? [];

  const isEmpty = !isFetching && !isError && brands.length === 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search brands..."
          defaultValue={search}
          onChange={(e) => updateParam("search", e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isError ? (
        <TableError message="Unable to fetch brands. Please try again." />
      ) : isEmpty ? (
        <EmptyTable
          title="No brands found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <DataTable<Brand>
          headers={[
            {
              label: "Image",
              render: (p) => <DataTableImage image={p.image} title={p.title} />,
            },
            { key: "title", label: "Brand Name", sortable: true },
            { key: "description", label: "Description", sortable: true },
          ]}
          data={brands}
          sort={sort}
          onSort={toggleSort}
          isLoading={isFetching}
          actions={[
            {
              icon: <Eye className="h-4 w-4" />,
              href: (p) => `/brands/${p._id}`,
            },
            {
              icon: <Pencil className="h-4 w-4" />,
              href: (p) => `/admin/dashboard/brands/edit/${p._id}`,
            },
            {
              render: (p) => (
                <DeleteActionDialog
                  resource="brands"
                  id={p._id}
                  invalidateKey={["brands"]}
                  title="Delete brand?"
                  onSuccessMessage="Brand deleted"
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
