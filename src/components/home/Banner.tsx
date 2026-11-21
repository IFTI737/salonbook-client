import Link from "next/link";
import { ArrowRight, CalendarCheck, Sparkles, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SafeImage from "@/components/shared/SafeImage";

export default function Banner() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 size-80 rounded-full bg-gold/20 blur-3xl" />

      <div className="container mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="relative flex flex-col items-start gap-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" /> Salon appointments, made simple
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
            Look good. Feel good.
            <br />
            <span className="text-primary">Book in minutes.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Haircuts, coloring, skincare, makeup, nails and spa treatments from expert stylists. Pick a service,
            choose your time and we will have everything ready when you arrive.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className={buttonVariants({ size: "lg", className: "h-12 rounded-full px-7 text-base" })}>
              Explore Salon Services
              <ArrowRight />
            </Link>
            <Link
              href="/#how-it-works"
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 rounded-full px-7 text-base" })}
            >
              How it works
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-gold text-gold" /> 4.9 average rating
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarCheck className="size-4 text-primary" /> 10k+ visits booked
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/20">
            <SafeImage
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
              alt="Stylist styling a client's hair in a bright salon"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-xl animate-float sm:block">
            <p className="text-xs text-muted-foreground">Next free slot</p>
            <p className="font-semibold">Today, 03:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
