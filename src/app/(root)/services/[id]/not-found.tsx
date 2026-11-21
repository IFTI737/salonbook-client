import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Shown when the id in the URL is wrong or the service was deleted.
export default function ServiceNotFound() {
  return (
    <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <SearchX className="size-14 text-primary" />
      <h1 className="text-3xl font-bold">Service not found</h1>
      <p className="max-w-md text-muted-foreground">
        This service does not exist or was removed. Please pick another one from our list.
      </p>
      <Link href="/services" className={buttonVariants({ size: "lg" })}>
        Browse Services
      </Link>
    </section>
  );
}
