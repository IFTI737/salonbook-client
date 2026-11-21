import { CalendarClock, CreditCard, Search, Smile } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  { icon: Search, title: "Choose a service", text: "Browse services, compare prices and read what is included." },
  { icon: CalendarClock, title: "Pick date & time", text: "Select a day and a free time slot that suits you." },
  { icon: CreditCard, title: "Get confirmed & pay", text: "The salon confirms your visit, then you pay securely online." },
  { icon: Smile, title: "Relax and enjoy", text: "Walk in at your time. No waiting, no phone calls." },
];

// Extra home section: how booking works in 4 steps.
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionHeading eyebrow="How it works" title="Your visit in four easy steps" />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative rounded-2xl border bg-card p-6">
            <span className="absolute top-4 right-5 font-heading text-4xl font-bold text-primary/15">0{i + 1}</span>
            <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon className="size-6" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
