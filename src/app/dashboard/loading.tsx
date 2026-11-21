import { DashboardHeaderSkeleton, StatCardsSkeleton, TableSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div>
      <DashboardHeaderSkeleton />
      <StatCardsSkeleton />
      <div className="mt-8">
        <TableSkeleton />
      </div>
    </div>
  );
}
