import { CATEGORY_DETAILS } from "@/lib/constants";

// endless ticker of salon services (one transform animation, pauses on hover)
export default function Marquee() {
  const items = [...CATEGORY_DETAILS.map((c) => c.name), "Bridal Packages", "Beard Grooming", "Nail Art"];
  const row = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y bg-foreground py-4 text-background">
      <div className="flex w-max animate-marquee gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-xl font-bold tracking-tight whitespace-nowrap sm:text-2xl">
            <span className={i % 2 ? "text-outline" : ""}>{label}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
