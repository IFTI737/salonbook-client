import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-10">
      <Skeleton className="mb-6 h-9 w-40" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4">
          <Skeleton className="aspect-[16/10] rounded-3xl" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-[480px] rounded-2xl" />
      </div>
    </section>
  );
}
