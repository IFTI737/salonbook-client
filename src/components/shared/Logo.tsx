import Link from "next/link";
import { Scissors } from "lucide-react";
import { cn } from "cn";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2 font-heading text-xl font-bold tracking-tight", className)}
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Scissors className="size-5 transition-transform duration-500 group-hover:-rotate-12" />
      </span>
      Salon<span className="text-primary">Book</span>
    </Link>
  );
}
