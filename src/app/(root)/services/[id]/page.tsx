import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Ban, Clock, ShieldAlert, Tag } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatDuration, formatPrice } from "@/lib/format";
import type { Service } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import SafeImage from "@/components/shared/SafeImage";
import BookingForm from "./_components/BookingForm";

type Props = { params: Promise<{ id: string }> };

async function getService(id: string) {
  const res = await apiFetch<Service>(`/services/${id}`);
  // a wrong or unknown id shows the "service not found" page
  if (!res.success && /invalid|not found/i.test(res.message)) notFound();
  if (!res.success) throw new Error(res.message);
  return res.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await apiFetch<Service>(`/services/${id}`);
  return { title: res.success ? res.data.serviceName : "Service" };
}

// Private page (see proxy.ts): service details and the booking form.
export default async function ServiceDetailsPage({ params }: Props) {
  const { id } = await params;
  const [service, session] = await Promise.all([getService(id), getSession()]);
  const isAdmin = session?.user.role === "admin";
  const isActive = service.status === "active";

  return (
    <section className="container mx-auto px-4 py-10">
      <Link href="/services" className={buttonVariants({ variant: "ghost", className: "mb-6" })}>
        <ArrowLeft /> Back to services
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border">
            <SafeImage src={service.image} alt={service.serviceName} priority sizes="(max-width: 1024px) 100vw, 60vw" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <Tag /> {service.category}
            </Badge>
            <Badge variant="outline">
              <Clock /> {formatDuration(service.duration)}
            </Badge>
            {!isActive && <Badge variant="destructive">Currently unavailable</Badge>}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{service.serviceName}</h1>
          <p className="mt-2 text-3xl font-bold text-primary">{formatPrice(service.price)}</p>
          <p className="mt-6 leading-relaxed whitespace-pre-line text-muted-foreground">{service.description}</p>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {isAdmin ? (
            <Notice icon={<ShieldAlert className="size-8 text-primary" />} title="Admins cannot book appointments">
              You are signed in as an admin. Use a customer account to book this service.
            </Notice>
          ) : !isActive ? (
            <Notice icon={<Ban className="size-8 text-destructive" />} title="This service is not available">
              The salon has paused this service for now. Please choose another one.
            </Notice>
          ) : (
            <BookingForm serviceId={service._id} />
          )}
        </div>
      </div>
    </section>
  );
}

function Notice({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{children}</p>
      <Link href="/services" className={buttonVariants({ variant: "outline", className: "mt-2" })}>
        Browse other services
      </Link>
    </div>
  );
}
