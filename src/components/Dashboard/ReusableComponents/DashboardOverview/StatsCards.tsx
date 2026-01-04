import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  stats: {
    numProducts: number;
    numRatings: number;
    avgRating: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
}

export default function StatsCards({ stats }: Props) {
  const items = [
    { label: "Products", value: stats.numProducts },
    { label: "Ratings", value: stats.numRatings },
    { label: "Average Rating", value: stats.avgRating.toFixed(1) },
    { label: "Average Price", value: `$${stats.avgPrice.toFixed(2)}` },
    { label: "Min Price", value: `$${stats.minPrice}` },
    { label: "Max Price", value: `$${stats.maxPrice}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-600">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
