import { cn } from "cn";

// One number with a label and icon, used on both overview pages.
export default function StatCard({
  label,
  value,
  icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "primary" | "amber" | "sky" | "emerald" | "red";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    sky: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    red: "bg-red-500/15 text-red-600 dark:text-red-300",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl [&_svg]:size-6", tones[tone])}>
        {icon}
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
