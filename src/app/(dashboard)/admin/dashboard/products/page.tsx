import apiServer from "@/app/lib/apiServer.server";
import ProductsTable from "@/components/Dashboard/AdminDashboardPage/ProductsTable";

async function getProducts(searchParams: {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
}) {
  const api = await apiServer();

  const res = await api.get("/products", {
    params: {
      page: searchParams.page ?? 1,
      limit: searchParams.limit ?? 10,
      sort: searchParams.sort,
      search: searchParams.search,
    },
  });

  return res.data;
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    sort?: string;
    search?: string;
  };
}) {
  const data = await getProducts(searchParams);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-indigo-600">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage all products in your store
          </p>
        </div>

        <a
          href="/admin/dashboard/products/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Add Product
        </a>
      </div>

      <ProductsTable initialData={data} />
    </section>
  );
}
