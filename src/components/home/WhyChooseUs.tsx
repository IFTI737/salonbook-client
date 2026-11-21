import Link from "next/link";
import { Award, Leaf, ShieldCheck, Timer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const promises = [
  { icon: Award, title: "Certified Stylists", text: "Every stylist is trained and certified, with years of salon experience." },
  { icon: Leaf, title: "Gentle Products", text: "Salon-grade, skin-friendly and cruelty-free products on every client." },
  { icon: ShieldCheck, title: "Clean & Safe", text: "Tools are sterilised after every visit. Your comfort comes first." },
  { icon: Timer, title: "On-Time, Every Time", text: "Booked slots mean no waiting room. Your time is respected." },
];

// Extra home section: why clients trust the salon (dark band).
export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-background">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 size-[30rem] rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40 invert" />
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        <div data-reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-spotlight uppercase">
            <span className="text-background/50">(04)</span>
            <span className="h-px w-8 bg-spotlight/60" />
            The SalonBook Promise
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Care you can see. <span className="text-primary">Comfort you can feel.</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-background/70">
            Thousands of clients trust us with their hair, skin and nails. Book online, walk in on time
            and leave feeling like the best version of yourself.
          </p>
          <Link href="/services" className={buttonVariants({ size: "lg", className: "mt-8 h-12 rounded-full px-7 text-base" })}>
            Book a Visit
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
              className="group rounded-3xl border border-background/10 bg-background/[0.04] p-6 transition-[translate,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-primary/60 hover:bg-background/[0.08]"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-spotlight transition duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
