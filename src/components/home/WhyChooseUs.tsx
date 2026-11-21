import { Award, Leaf, ShieldCheck, Timer } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const reasons = [
  { icon: Award, title: "Certified stylists", text: "Every stylist is trained and certified with years of salon experience." },
  { icon: Leaf, title: "Gentle products", text: "We use salon-grade, skin-friendly and cruelty-free products." },
  { icon: ShieldCheck, title: "Clean & safe", text: "Tools are sterilised after every client. Your comfort comes first." },
  { icon: Timer, title: "On-time service", text: "Booked slots mean no waiting room. Your time is respected." },
];

const reviews = [
  { name: "Nusrat J.", text: "Booked a balayage in two minutes and the result was stunning. Super easy!" },
  { name: "Arif H.", text: "Love that I can pick my exact time. The fade and beard trim were spot on." },
  { name: "Sadia R.", text: "The glow facial was so relaxing. Paying online made it even smoother." },
];

// Extra home section: reasons to book + short client reviews.
export default function WhyChooseUs() {
  return (
    <section className="bg-foreground py-16 text-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Why SalonBook"
          title="Care you can see and feel"
          className="[&_p]:text-background/70"
          text="Thousands of happy clients trust us with their hair, skin and nails."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-background/10 bg-background/5 p-6">
              <Icon className="mb-3 size-8 text-gold" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-background/70">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-background p-6 text-foreground">
              <blockquote className="text-sm">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-primary">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
