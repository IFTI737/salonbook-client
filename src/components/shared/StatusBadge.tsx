import { cn } from "cn";

const styles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  confirmed: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  cancelled: "bg-red-500/15 text-red-700 dark:text-red-300",
  paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  unpaid: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
  failed: "bg-red-500/15 text-red-700 dark:text-red-300",
  active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  inactive: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
  blocked: "bg-red-500/15 text-red-700 dark:text-red-300",
  admin: "bg-primary/15 text-primary",
  customer: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
};

// Colored pill for statuses like pending / confirmed / paid.
export default function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status] || styles.inactive,
        className,
      )}
    >
      {status}
    </span>
  );
}
