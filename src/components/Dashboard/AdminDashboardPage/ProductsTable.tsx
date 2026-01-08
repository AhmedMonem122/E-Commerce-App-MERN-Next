"use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowUpDown, Eye, Pencil } from "lucide-react";
// import DeleteProductDialog from "./DeleteProductDialog";
import apiClient from "@/api/apiClient";
import { Product } from "@/types/product";
import { DataTablePagination } from "../ReusableComponents/DataTable/DataTablePagination";
import { DataTable } from "../ReusableComponents/DataTable/DataTable";
import { Eye, Pencil } from "lucide-react";

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

  const { data } = useQuery({
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

  const products = data.data.products;

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

      <DataTable<Product>
        headers={[
          { key: "title", label: "Title", sortable: true },
          { key: "price", label: "Price", sortable: true },
          { key: "ratingsAverage", label: "Rating", sortable: true },
          {
            label: "Brand",
            render: (p) => p.brand?.title ?? "—",
          },
        ]}
        data={products}
        sort={sort}
        onSort={toggleSort}
        actions={[
          {
            icon: <Eye className="h-4 w-4" />,
            href: (p) => `/products/${p._id}`,
          },
          {
            icon: <Pencil className="h-4 w-4" />,
            href: (p) => `/admin/dashboard/products/edit/${p._id}`,
          },
        ]}
      />

      <DataTablePagination
        page={data.metadata.currentPage}
        totalPages={data.metadata.numberOfPages}
        limit={Number(limit)}
        onPageChange={(p) => updateParam("page", String(p))}
        onLimitChange={(l) => updateParam("limit", String(l))}
      />

      {/* Table
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("title")}>
                  Title <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>

              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort("price")}>
                  Price <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>

              <TableHead>Rating</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.ratingsAverage} ⭐</TableCell>
                <TableCell>{product.brand?.title}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/products/${product._id}`}>
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Link
                      href={`/admin/dashboard/products/edit/${product._id}`}
                    >
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>

                    <DeleteProductDialog productId={product._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination 
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {data.metadata.currentPage} of {data.metadata.numberOfPages}
        </p>

        <div className="flex gap-2">
          {data.metadata.currentPage > 1 && (
            <Button
              variant="outline"
              onClick={() =>
                updateParam("page", String(data.metadata.currentPage - 1))
              }
            >
              Previous
            </Button>
          )}

          {data.metadata.nextPage && (
            <Button
              variant="outline"
              onClick={() =>
                updateParam("page", String(data.metadata.nextPage))
              }
            >
              Next
            </Button>
          )}
        </div>
      </div> */}
    </div>
  );
}
