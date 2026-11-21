import { Skeleton } from "@/components/ui/skeleton";

// Page-shaped skeletons so every route loads into its own layout, not a spinner.

export function ServiceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-card">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between border-t border-dashed pt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
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

export function HomeSkeleton() {
  return (
    <>
      <div className="relative h-[82vh] min-h-[560px] bg-neutral-900">
        <div className="container mx-auto flex h-full flex-col justify-center gap-5 px-4">
          <Skeleton className="h-6 w-56 rounded-full bg-white/10" />
          <Skeleton className="h-14 w-full max-w-2xl bg-white/10" />
          <Skeleton className="h-14 w-3/4 max-w-xl bg-white/10" />
          <Skeleton className="h-5 w-full max-w-lg bg-white/10" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-14 w-60 rounded-full bg-white/10" />
            <Skeleton className="h-14 w-44 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="h-16 border-y bg-foreground/90" />
      <section className="container mx-auto px-4 py-24">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
        <ServiceGridSkeleton />
      </section>
    </>
  );
}

export function BrowseSkeleton() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-16 w-full max-w-lg" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-11 flex-1 rounded-full" />
        <Skeleton className="h-11 w-full rounded-full sm:w-56" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>
      <div className="mt-12">
        <ServiceGridSkeleton />
      </div>
    </section>
  );
}

export function ServiceDetailsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-10">
      <Skeleton className="h-8 w-32 rounded-full" />
      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Skeleton className="aspect-[4/3] rounded-3xl sm:aspect-[16/10]" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-12 w-2/3" />
          <div className="space-y-2 border-t pt-8">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border bg-card p-6">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-9 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-card">
      <Skeleton className="h-11 rounded-none" />
      <div className="grid gap-3 p-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    </div>
  );
}

export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-3xl border bg-card p-5">
          <Skeleton className="size-11 rounded-2xl" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="mb-8 space-y-3 border-b border-dashed pb-6">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>
  );
}
