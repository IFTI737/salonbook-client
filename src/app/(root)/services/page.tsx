import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import ServiceCard from "@/components/shared/ServiceCard";
import { ServiceGridSkeleton } from "@/components/shared/Skeletons";
import FilterBar from "./_components/FilterBar";

export const metadata: Metadata = { title: "Browse Services" };

type SearchParams = { search?: string; category?: string; sort?: string };

async function ServiceResults({ params }: { params: SearchParams }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);

  const res = await apiFetch<Service[]>(`/services?${query.toString()}`);
  const services = res.success ? res.data : [];

  if (!services.length) {
    return (
      <Empty className="mt-10 border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle className="text-lg">{res.success ? "No services match your search" : "Services are unavailable"}</EmptyTitle>
          <EmptyDescription>{res.success ? "Try another name or category." : res.message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/services" className={buttonVariants({ className: "rounded-full" })}>
            Clear filters
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <p className="mt-8 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{services.length}</span>{" "}
        {services.length === 1 ? "service" : "services"}
        {params.category ? ` in ${params.category}` : ""}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service._id} service={service} index={i} />
        ))}
      </div>
    </>
  );
}

// Public page: only active services, with search, category filter and price sort.
export default async function BrowseServicesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  return (
    <section className="relative">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-80" />
      <div className="container relative mx-auto px-4 py-12">
        <div data-reveal className="mb-8">
          <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-8 bg-primary/60" />
            Book your next visit
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">
            Browse <span className="text-outline text-foreground/80">Services</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Search by name, pick a category and sort by price to find the right treatment for you.
          </p>
        </div>

        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>

        <Suspense key={JSON.stringify(params)} fallback={<div className="mt-12"><ServiceGridSkeleton /></div>}>
          <ServiceResults params={params} />
        </Suspense>
      </div>
    </section>
  );
}
