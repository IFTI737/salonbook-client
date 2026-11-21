import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Ban, Check, Clock, ShieldAlert, Sparkles, Tag } from "lucide-react";
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
      <Link href="/services" className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-6 -ml-2.5" })}>
        <ArrowLeft /> All Services
      </Link>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
        <div className="min-w-0 space-y-10 lg:col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-muted sm:aspect-[16/10]">
            <SafeImage src={service.image} alt={service.serviceName} priority sizes="(max-width: 1024px) 100vw, 66vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase">
              {service.category}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                <Tag /> {service.category}
              </Badge>
              {!isActive && <Badge variant="destructive">Currently unavailable</Badge>}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight [overflow-wrap:anywhere] sm:text-5xl">{service.serviceName}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Clock className="size-4" /> {formatDuration(service.duration)}
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="size-4" /> Senior stylist
              </p>
            </div>
          </div>

          <div data-reveal className="border-t pt-8">
            <h2 className="text-2xl font-bold tracking-tight">About this service</h2>
            <p className="mt-3 leading-relaxed [overflow-wrap:anywhere] whitespace-pre-line text-muted-foreground">{service.description}</p>
          </div>

          <div data-reveal className="border-t pt-8">
            <h2 className="text-2xl font-bold tracking-tight">Good to know</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Free cancellation while pending",
                "Pay online after confirmation",
                "Please arrive 5 minutes early",
                "Tell us about allergies in the message",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24">
          <div data-reveal className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-[0_30px_70px_-35px] shadow-primary/50 ring-1 ring-primary/20">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-primary/15 blur-3xl" />
            <p>
              <span className="relative font-heading text-5xl font-bold text-primary">{formatPrice(service.price)}</span>
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase"> / visit</span>
            </p>
            <p className="mt-2 flex items-center gap-2 border-b border-dashed pb-5 text-sm text-muted-foreground">
              <Clock className="size-4" /> {formatDuration(service.duration)} in the chair
            </p>
            <div className="mt-5">
              {isAdmin ? (
                <Notice icon={<ShieldAlert className="size-8 text-primary" />} title="Admins cannot book">
                  You are signed in as an admin. Use a customer account to book this service.
                </Notice>
              ) : !isActive ? (
                <Notice icon={<Ban className="size-8 text-destructive" />} title="Not available right now">
                  The salon has paused this service. Please choose another one.
                </Notice>
              ) : (
                <BookingForm serviceId={service._id} />
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Notice({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-6 text-center">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{children}</p>
      <Link href="/services" className={buttonVariants({ variant: "outline", className: "mt-2 rounded-full" })}>
        Browse other services
      </Link>
    </div>
  );
}
