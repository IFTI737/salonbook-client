import { apiFetch } from "@/lib/api";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";

export const metadata = { title: "Transactions" };

// Read-only: payment records are created only by the verified Stripe webhook.
export default async function TransactionsPage() {
  const res = await apiFetch<Transaction[]>("/transactions", { withAuth: true });
  if (!res.success) throw new Error(res.message);
  const list = res.data;

  return (
    <div>
      <PageHeader title="Transactions" text="All online payments. These records cannot be edited." />
      {list.length ? (
        <div className="overflow-hidden rounded-3xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stripe session</TableHead>
                <TableHead>Transaction date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>
                    <p className="font-medium">{t.appointment?.customerName || "—"}</p>
                    <p className="text-xs text-muted-foreground">{t.appointment?.customerEmail}</p>
                  </TableCell>
                  <TableCell>{t.appointment?.serviceName || "—"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {t.appointment ? formatDate(t.appointment.appointmentDate) : "—"}
                    {t.appointment && <p className="text-xs text-muted-foreground">{t.appointment.timeSlot}</p>}
                  </TableCell>
                  <TableCell>{formatPrice(t.amount)}</TableCell>
                  <TableCell className="uppercase">{t.currency}</TableCell>
                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>
                  <TableCell className="max-w-40 truncate font-mono text-xs">{t.stripeSessionId}</TableCell>
                  <TableCell>{formatDateTime(t.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState title="No transactions yet" text="Payments will appear here after customers pay online." />
      )}
    </div>
  );
}
