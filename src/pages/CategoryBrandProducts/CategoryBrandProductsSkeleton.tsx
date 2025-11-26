import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryBrandProductsSkeleton() {
  return (
    <section>
      <div className="mb-8">
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded" />
        ))}
      </div>
    </section>
  );
}
