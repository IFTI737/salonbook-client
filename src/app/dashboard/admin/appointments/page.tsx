import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import AdminAppointmentActions from "./_components/AdminAppointmentActions";
import StatusTabs from "./_components/StatusTabs";

export const metadata = { title: "Manage Appointments" };

type Props = { searchParams: Promise<{ status?: string }> };

export default async function ManageAppointmentsPage({ searchParams }: Props) {
  const { status = "all" } = await searchParams;
  const query = status !== "all" ? `?status=${encodeURIComponent(status)}` : "";
  const res = await apiFetch<Appointment[]>(`/appointments${query}`, { withAuth: true });
  if (!res.success) throw new Error(res.message);
  const appointments = res.data;

  return (
    <div>
      <PageHeader title="Manage Appointments" text="Confirm new bookings or cancel the ones that cannot happen." />
      <StatusTabs current={status} />
      {appointments.length ? (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>
                    <p className="font-medium">{a.customerName}</p>
                    <p className="text-xs text-muted-foreground">{a.customerEmail}</p>
                  </TableCell>
                  <TableCell>
                    <p>{a.serviceName}</p>
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
                  <TableCell>
                    <AdminAppointmentActions appointment={a} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState title="No appointments here" text="Try another filter." />
      )}
    </div>
  );
}
