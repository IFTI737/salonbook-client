import Link from "next/link";
import { Ban } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

export const metadata = { title: "Account Blocked" };

export default function BlockedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
      <Logo />
      <Ban className="size-14 text-destructive" />
      <h1 className="text-3xl font-bold">Your account is blocked</h1>
      <p className="max-w-md text-muted-foreground">
        You cannot use protected features right now. Please contact the salon if you think this is a mistake.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Back to Home
      </Link>
    </main>
  );
}
