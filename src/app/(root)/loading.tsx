import { Skeleton } from "@/components/ui/skeleton";
import { ServiceGridSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto grid gap-12 px-4 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="grid gap-4">
          <Skeleton className="h-8 w-56 rounded-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-12 w-60 rounded-full" />
        </div>
        <Skeleton className="aspect-[4/5] w-full max-w-lg rounded-[2rem]" />
      </div>
      <ServiceGridSkeleton count={3} />
    </div>
  );
}
