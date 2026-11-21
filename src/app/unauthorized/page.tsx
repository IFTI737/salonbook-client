import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
      <Logo />
      <ShieldAlert className="size-14 text-primary" />
      <h1 className="text-3xl font-bold">You are not allowed here</h1>
      <p className="max-w-md text-muted-foreground">
        Your account does not have permission to open this page.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Back to Home
      </Link>
    </main>
  );
}
