import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Temporary home page. The full banner, featured services and categories come in later commits.
export default function HomePage() {
  return (
    <section className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
        Salon appointments, made simple
      </span>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        Look good. Feel good. <span className="text-primary">Book in minutes.</span>
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Pick a service, choose a time that works for you and pay online. Your next salon visit is just a few clicks away.
      </p>
      <Link href="/services" className={buttonVariants({ size: "lg", className: "rounded-full px-6" })}>
        Explore Salon Services
        <ArrowRight />
      </Link>
    </section>
  );
}
