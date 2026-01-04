"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  stats: {
    avgRating: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
}

export default function DashboardOverviewCharts({ stats }: Props) {
  const priceData = [
    { name: "Min", value: stats.minPrice },
    { name: "Avg", value: stats.avgPrice },
    { name: "Max", value: stats.maxPrice },
  ];

  const ratingData = [{ name: "Rating", value: stats.avgRating * 20 }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Price Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Price Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rating Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Average Rating</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={ratingData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" fill="#6366f1" cornerRadius={10} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-indigo-600 text-xl font-bold"
              >
                {stats.avgRating.toFixed(1)} ⭐
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
