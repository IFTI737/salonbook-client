import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import SafeImage from "./SafeImage";

// One service in a grid. Used on Home (featured) and Browse Services.
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={service.image}
          alt={service.serviceName}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur">{service.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug">{service.serviceName}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-primary">{formatPrice(service.price)}</span>
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {formatDuration(service.duration)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
