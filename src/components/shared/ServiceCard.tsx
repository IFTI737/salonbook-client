import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/format";
import SafeImage from "./SafeImage";

// One service in a grid (Home featured + Browse Services).
export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { _id, serviceName, category, image, price, duration, description } = service;

  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_60px_-28px] hover:shadow-primary/45"
    >
      <Link href={`/services/${_id}`} data-cursor="BOOK" aria-label={`View ${serviceName}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <SafeImage src={image} alt={serviceName} className="transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.07]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white uppercase">
          {category}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900">
          <Clock className="size-3.5 text-primary" />
          {formatDuration(duration)}
        </span>
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 transition duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-heading text-xl font-bold tracking-tight">
          <Link href={`/services/${_id}`} className="transition-colors hover:text-primary">
            {serviceName}
          </Link>
        </h3>
        <p className="mt-2 mb-5 line-clamp-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed pt-4">
          <p>
            <span className="font-heading text-2xl font-bold">{formatPrice(price)}</span>
            <span className="font-mono text-xs text-muted-foreground"> / VISIT</span>
          </p>
          <Link
            href={`/services/${_id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Details
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
