import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Skeleton */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <Skeleton className="w-full h-[350px] md:h-[430px] rounded-lg" />
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Price + Rating */}
          <div className="flex items-center gap-4 mt-4">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Brand & Category */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-20 w-20 rounded" />
            <Skeleton className="h-20 w-20 rounded" />
            <Skeleton className="h-20 w-20 rounded" />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 space-y-4">
        <Skeleton className="h-7 w-40" />

        {/* Add Review Form */}
        <div className="flex gap-3 items-start">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-20" />
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 border rounded-xl flex flex-col gap-3">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Review text */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />

              {/* Buttons */}
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
