import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

// Full-screen message page (404, unauthorized, blocked) in the site's style.
export default function StatusPage({
  code,
  eyebrow,
  title,
  text,
  icon,
}: {
  code: string;
  eyebrow: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <p aria-hidden className="text-outline relative font-heading text-[9rem] leading-none font-extrabold tracking-tighter text-primary/40 select-none sm:text-[13rem]">
        {code}
      </p>
      <span className="relative -mt-6 flex size-16 animate-float items-center justify-center rounded-2xl bg-foreground text-background [&_svg]:size-8">
        {icon}
      </span>
      <p className="relative mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
        <span className="h-px w-8 bg-primary/60" />
        {eyebrow}
        <span className="h-px w-8 bg-primary/60" />
      </p>
      <h1 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="relative mt-3 max-w-md text-muted-foreground">{text}</p>
      <Link
        href="/"
        className="group/btn relative mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-primary pr-1.5 pl-6 font-semibold text-primary-foreground shadow-[0_18px_40px_-14px] shadow-primary/70"
      >
        Back to Home
        <span className="flex size-9 items-center justify-center rounded-full bg-black/85 text-white transition-transform duration-300 group-hover/btn:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </main>
  );
}
