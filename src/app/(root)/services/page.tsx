import { Suspense } from "react";
import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import ServiceCard from "@/components/shared/ServiceCard";
import EmptyState from "@/components/shared/EmptyState";
import FilterBar from "./_components/FilterBar";

export const metadata: Metadata = { title: "Browse Services" };

type Props = { searchParams: Promise<{ search?: string; category?: string; sort?: string }> };

// Public page: only active services, with search, category filter and price sort.
export default async function BrowseServicesPage({ searchParams }: Props) {
  const { search = "", category = "", sort = "" } = await searchParams;
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category) query.set("category", category);
  if (sort) query.set("sort", sort);

  const res = await apiFetch<Service[]>(`/services?${query.toString()}`);
  const services = res.success ? res.data : [];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Browse Services</h1>
        <p className="mt-2 text-muted-foreground">Find your next treatment and book a time that suits you.</p>
      </div>

      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>

      <p className="mt-6 mb-4 text-sm text-muted-foreground">
        {res.success ? `${services.length} service${services.length === 1 ? "" : "s"} found` : res.message}
      </p>

      {services.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <EmptyState title="No services match" text="Try another name or category." />
      )}
    </section>
  );
}
