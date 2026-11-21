import Link from "next/link";
import { Ban, CalendarCheck, CalendarClock, CircleCheck, DollarSign, Scissors, Users } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import type { AdminStats } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminOverviewPage() {
  const res = await apiFetch<AdminStats>("/stats/admin", { withAuth: true });
  if (!res.success) throw new Error(res.message);
  const s = res.data;

  return (
    <div>
      <PageHeader title="Admin Overview" text="Everything happening at the salon today.">
        <Link href="/dashboard/admin/services/new" className={buttonVariants({ className: "rounded-full" })}>
          Add new service
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Services (active)" value={`${s.totalServices} (${s.activeServices})`} icon={<Scissors />} />
        <StatCard label="Customers" value={s.totalCustomers} icon={<Users />} tone="sky" />
        <StatCard label="Total appointments" value={s.appointments.total} icon={<CalendarCheck />} tone="primary" />
        <StatCard label="Revenue (paid)" value={formatPrice(s.revenue)} icon={<DollarSign />} tone="emerald" />
        <StatCard label="Pending" value={s.appointments.pending} icon={<CalendarClock />} tone="amber" />
        <StatCard label="Confirmed" value={s.appointments.confirmed} icon={<CircleCheck />} tone="sky" />
        <StatCard label="Cancelled" value={s.appointments.cancelled} icon={<Ban />} tone="red" />
        <StatCard label="Blocked users" value={s.blockedUsers} icon={<Ban />} tone="red" />
      </div>

      <div className="mt-10 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest bookings</h2>
        <Link href="/dashboard/admin/appointments" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          View all
        </Link>
      </div>
      {s.recent.length ? (
        <ul className="grid gap-3">
          {s.recent.map((a) => (
            <li key={a._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
              <div>
                <p className="font-medium">
                  {a.serviceName} <span className="text-muted-foreground">· {a.customerName}</span>
                </p>
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
        <EmptyState title="No bookings yet" />
      )}
    </div>
  );
}
