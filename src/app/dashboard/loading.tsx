import { Skeleton } from "@/components/ui/skeleton";
import { StatCardsSkeleton, TableSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-9 w-64" />
      <StatCardsSkeleton />
      <TableSkeleton />
    </div>
  );
}
