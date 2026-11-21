import { cn } from "cn";

// One number with a label and icon, used on both overview pages.
export default function StatCard({
  label,
  value,
  icon,
  tone = "primary",
  index = 0,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "primary" | "amber" | "sky" | "emerald" | "red";
  index?: number;
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    sky: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    red: "bg-red-500/15 text-red-600 dark:text-red-300",
  };
  return (
    <div
      data-reveal
      style={{ "--d": `${(index % 4) * 80}ms` } as React.CSSProperties}
      className="group relative overflow-hidden rounded-3xl border bg-card p-5 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px] hover:shadow-primary/40"
    >
      <span className={cn("flex size-11 items-center justify-center rounded-2xl transition duration-500 group-hover:-rotate-6 [&_svg]:size-5", tones[tone])}>
        {icon}
      </span>
      <p className="mt-4 font-heading text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
    </div>
  );
}
