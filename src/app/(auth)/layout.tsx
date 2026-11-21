import { Scissors, Sparkles } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-10 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm animate-fade-up">{children}</div>
        </div>
      </div>

      {/* decorative side panel (no external image, so it never breaks) */}
      <div className="relative isolate hidden overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-gold/70 lg:block">
        <Scissors aria-hidden className="absolute -top-10 -right-10 size-80 rotate-12 text-white/10" />
        <Sparkles aria-hidden className="absolute bottom-24 left-12 size-24 text-white/20 animate-float" />
        <div className="absolute inset-x-0 bottom-0 p-14 text-white">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wider uppercase">
            Book. Relax. Glow.
          </span>
          <h2 className="text-4xl font-bold tracking-tight">Your next salon visit starts here.</h2>
          <p className="mt-3 max-w-md text-white/85">
            Haircuts, coloring, skincare, makeup, nails and spa treatments, booked online in a few clicks.
          </p>
        </div>
      </div>
    </div>
  );
}
