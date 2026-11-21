import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import SectionHeading from "@/components/shared/SectionHeading";

// Shows the 6 newest ACTIVE services straight from the database.
export default async function FeaturedServices() {
  const res = await apiFetch<Service[]>("/services?limit=6");
  const services = res.success ? res.data : [];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            className="mb-10"
            index="01"
            eyebrow="Featured Services"
            title="Treatments our clients love"
            description="Our most booked services, with clear prices and real-time free slots."
          />
          <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg", className: "mb-10 rounded-full px-5" })}>
            View all services <ArrowRight />
          </Link>
        </div>
        {services.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service._id} service={service} index={i} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            {res.success ? "New services are coming soon." : "Services are unavailable right now. Please refresh in a moment."}
          </p>
        )}
      </div>
    </section>
  );
}
