import { Skeleton } from "@/components/ui/skeleton";
import { ServiceGridSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      <Skeleton className="mt-8 h-[74px] rounded-2xl" />
      <div className="mt-10">
        <ServiceGridSkeleton />
      </div>
    </section>
  );
}
