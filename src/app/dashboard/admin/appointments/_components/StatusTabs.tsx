import Link from "next/link";
import { cn } from "cn";

const tabs = ["all", "pending", "confirmed", "cancelled"];

// Filter links. The current filter is kept in the URL (?status=...).
export default function StatusTabs({ current }: { current: string }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tabs.map((t) => (
        <Link
          key={t}
          href={t === "all" ? "/dashboard/admin/appointments" : `/dashboard/admin/appointments?status=${t}`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
            current === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:text-primary",
          )}
        >
          {t}
        </Link>
      ))}
    </div>
  );
}
