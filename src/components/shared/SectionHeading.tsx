import { cn } from "cn";

// Small label + big title + optional text, used by every home section.
export default function SectionHeading({
  eyebrow,
  title,
  text,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <span className="text-sm font-semibold tracking-wider text-primary uppercase">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}
