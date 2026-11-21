import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";

// Shows the 6 newest ACTIVE services straight from the database.
export default async function FeaturedServices() {
  const res = await apiFetch<Service[]>("/services?limit=6");
  const services = res.success ? res.data : [];

  return (
    <section className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Featured"
        title="Our most loved services"
        text="Hand-picked treatments our clients book again and again."
      />
      {services.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <EmptyState title="No services yet" text={res.success ? "New services are coming soon." : res.message} />
      )}
      <div className="mt-10 text-center">
        <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-6" })}>
          View all services <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
