import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_DETAILS } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

// fanned like a hand of cards on desktop, swipeable row on phones
const fan = [
  { rot: "-10deg", y: "34px" },
  { rot: "-6deg", y: "12px" },
  { rot: "-2deg", y: "0px" },
  { rot: "0deg", y: "-6px" },
  { rot: "2deg", y: "0px" },
  { rot: "6deg", y: "12px" },
  { rot: "10deg", y: "34px" },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-muted/50 py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          index="02"
          eyebrow="Browse by Category"
          title="What are we doing today?"
          description="Hover a card to pull it out of the deck. Pick a category and we show every service in it."
        />
        <div
          data-reveal
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-8 lg:mx-0 lg:justify-center lg:gap-0 lg:overflow-visible lg:px-0 lg:pt-10 lg:pb-16"
        >
          {CATEGORY_DETAILS.map(({ name, label, image, blurb }, i) => (
            <Link
              key={name}
              href={`/services?category=${encodeURIComponent(name)}`}
              data-cursor="OPEN"
              style={{ "--rot": fan[i].rot, "--y": fan[i].y } as React.CSSProperties}
              className="deck-card group relative flex aspect-[3/4] w-[min(70vw,240px)] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[1.6rem] bg-neutral-900 p-5 text-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)] ring-1 ring-primary/30 lg:-mx-4 lg:w-[190px] xl:w-[210px]"
            >
              <Image
                src={image}
                alt={name}
                fill
                unoptimized
                sizes="240px"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">0{i + 1}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="relative">
                <h3 className="text-2xl leading-none font-bold tracking-tight">{label}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-wider text-spotlight uppercase">{name}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
