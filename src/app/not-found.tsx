import Link from "next/link";
import { Scissors } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
      <Logo />
      <Scissors className="size-14 animate-float text-primary" />
      <h1 className="text-6xl font-bold">404</h1>
      <p className="max-w-md text-muted-foreground">
        Oops, this page got a trim and is gone. Let&apos;s get you back to something beautiful.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Back to Home
      </Link>
    </main>
  );
}
