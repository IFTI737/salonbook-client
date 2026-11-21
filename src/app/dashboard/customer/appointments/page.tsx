import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import SafeImage from "@/components/shared/SafeImage";
import AppointmentDetails from "@/components/appointments/AppointmentDetails";
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
        <div className="overflow-hidden rounded-3xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date & time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <SafeImage src={a.serviceImage} alt={a.serviceName} sizes="48px" />
                      </div>
                      <div>
                        <p className="font-medium">{a.serviceName}</p>
                        <p className="text-xs text-muted-foreground">{a.serviceCategory}</p>
                      </div>
                    </div>
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
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(a.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <AppointmentDetails appointment={a} />
                      <AppointmentActions appointment={a} />
                    </div>
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
