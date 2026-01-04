import apiServer from "@/app/lib/apiServer.server";
import StatsCards from "./StatsCards";
import DashboardOverviewCharts from "./DashboardOverviewCharts";

async function getProductStats() {
  const api = await apiServer();

  const res = await api.get("/products/product-stats");
  return res.data.data.stats[0];
}

export default async function DashboardOverview() {
  const stats = await getProductStats();

  return (
    <section className="space-y-6">
      {/* SEO-friendly heading */}
      <header>
        <h2 className="text-xl font-semibold text-indigo-600">
          Products Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Key statistics about products, ratings, and pricing.
        </p>
      </header>

      {/* Server-rendered stats (SEO) */}
      <StatsCards stats={stats} />

      {/* Client-side charts */}
      <DashboardOverviewCharts stats={stats} />
    </section>
  );
}
