import { CalendarClock, CreditCard, Search, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  { icon: Search, title: "Choose a Service", text: "Search by name, filter by category and compare prices and durations." },
  { icon: CalendarClock, title: "Pick Date & Slot", text: "Select a day and one of the free time slots. Taken slots are crossed out." },
  { icon: CreditCard, title: "Confirm & Pay", text: "The salon confirms your visit, then you pay securely online with Stripe." },
  { icon: Sparkles, title: "Walk In & Glow", text: "Arrive at your time, no waiting room. Sit back and enjoy the treatment." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          index="03"
          eyebrow="How Booking Works"
          title="From browsing to the chair in 4 steps"
          description="No phone calls, no guesswork. Just clear prices and real-time availability."
        />
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_60px_-30px] hover:shadow-primary/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-4 -right-1 font-heading text-8xl font-extrabold text-outline text-primary/20 transition-colors duration-500 group-hover:text-primary/45"
              >
                0{i + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-500 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Step 0{i + 1}</p>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
