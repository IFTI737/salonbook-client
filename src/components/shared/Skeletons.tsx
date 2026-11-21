import { Skeleton } from "@/components/ui/skeleton";

// Placeholder shapes shown while pages load.

export function ServiceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="grid gap-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2 h-6 w-24" />
      </div>
    </div>
  );
}

export function ServiceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="h-11 rounded-none" />
      <div className="grid gap-3 p-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10" />
        ))}
      </div>
    </div>
  );
}

export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}
