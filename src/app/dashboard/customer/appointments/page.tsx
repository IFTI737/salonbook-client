import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import AppointmentActions from "./_components/AppointmentActions";

export const metadata = { title: "My Appointments" };

// Only the logged-in customer's own appointments (the server filters by the JWT user id).
export default async function MyAppointmentsPage() {
  const res = await apiFetch<Appointment[]>("/appointments/my", { withAuth: true });
  if (!res.success) throw new Error(res.message);
  const appointments = res.data;

  return (
    <div>
      <PageHeader title="My Appointments" text="Cancel pending visits or pay for confirmed ones." />
      {appointments.length ? (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date & time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>
                    <p className="font-medium">{a.serviceName}</p>
                    {a.message && <p className="max-w-xs truncate text-xs text-muted-foreground">“{a.message}”</p>}
                  </TableCell>
                  <TableCell>
                    {formatDate(a.appointmentDate)}
                    <p className="text-xs text-muted-foreground">{a.timeSlot}</p>
                  </TableCell>
                  <TableCell>{formatPrice(a.servicePrice)}</TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={a.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <AppointmentActions appointment={a} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState title="No appointments yet" text="Your bookings will appear here.">
          <Link href="/services" className={buttonVariants()}>
            Browse Services
          </Link>
        </EmptyState>
      )}
    </div>
  );
}
