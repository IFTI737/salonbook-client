import Link from "next/link";
import { Brush, Droplets, Flower2, Hand, Palette, Scissors, Sparkles } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

const icons = [Scissors, Palette, Droplets, Sparkles, Brush, Hand, Flower2];
const blurbs = [
  "Cuts, blow dries and styling",
  "Highlights, balayage, global color",
  "Keratin, spa and repair masks",
  "Facials and glowing skin care",
  "Party, bridal and everyday looks",
  "Nail care, gel polish and spa feet",
  "Relaxing massages and body care",
];

// The 7 categories. Each one opens Browse Services already filtered.
export default function Categories() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Categories" title="Find the right treatment" text="Browse by what you need today." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {SERVICE_CATEGORIES.map((category, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={category}
                href={`/services?category=${encodeURIComponent(category)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span className="text-sm font-semibold">{category}</span>
                <span className="text-xs text-muted-foreground">{blurbs[i]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
