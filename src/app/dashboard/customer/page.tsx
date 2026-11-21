import Link from "next/link";
import { CalendarCheck, CalendarClock, CircleCheck, CircleX, Wallet } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatDate, formatPrice } from "@/lib/format";
import type { CustomerStats } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";

export const metadata = { title: "Customer Dashboard" };

export default async function CustomerOverviewPage() {
  const [session, res] = await Promise.all([getSession(), apiFetch<CustomerStats>("/stats/customer", { withAuth: true })]);
  if (!res.success) throw new Error(res.message);
  const stats = res.data;

  return (
    <div>
      <PageHeader title={`Hi, ${session?.user.name?.split(" ")[0] || "there"}!`} text="Here is a quick look at your salon visits.">
        <Link href="/services" className={buttonVariants({ className: "rounded-full" })}>
          Book a new service
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total appointments" value={stats.total} icon={<CalendarCheck />} />
        <StatCard label="Pending" value={stats.pending} icon={<CalendarClock />} tone="amber" />
        <StatCard label="Confirmed" value={stats.confirmed} icon={<CircleCheck />} tone="sky" />
        <StatCard label="Cancelled" value={stats.cancelled} icon={<CircleX />} tone="red" />
        <StatCard label="Paid" value={stats.paid} icon={<Wallet />} tone="emerald" />
      </div>

      <h2 className="mt-10 mb-4 text-xl font-semibold">Upcoming appointments</h2>
      {stats.upcoming.length ? (
        <ul className="grid gap-3">
          {stats.upcoming.map((a) => (
            <li key={a._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
              <div>
                <p className="font-medium">{a.serviceName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(a.appointmentDate)} at {a.timeSlot} · {formatPrice(a.servicePrice)}
                </p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={a.status} />
                <StatusBadge status={a.paymentStatus} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No upcoming appointments" text="Book a service and it will show up here." />
      )}
    </div>
  );
}
