import Link from "next/link";
import { Plus } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDuration, formatPrice } from "@/lib/format";
import type { Service } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import SafeImage from "@/components/shared/SafeImage";
import ServiceRowActions from "./_components/ServiceRowActions";

export const metadata = { title: "Manage Services" };

export default async function ManageServicesPage() {
  const res = await apiFetch<Service[]>("/services/admin/all", { withAuth: true });
  if (!res.success) throw new Error(res.message);
  const services = res.data;

  return (
    <div>
      <PageHeader title="Manage Services" text="Add, edit, activate or remove salon services.">
        <Link href="/dashboard/admin/services/new" className={buttonVariants({ className: "rounded-full" })}>
          <Plus /> Add service
        </Link>
      </PageHeader>

      {services.length ? (
        <div className="overflow-hidden rounded-3xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <SafeImage src={s.image} alt={s.serviceName} sizes="48px" />
                      </div>
                      <span className="font-medium">{s.serviceName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.category}</TableCell>
                  <TableCell>{formatPrice(s.price)}</TableCell>
                  <TableCell>{formatDuration(s.duration)}</TableCell>
                  <TableCell>
                    <StatusBadge status={s.status} />
                  </TableCell>
                  <TableCell>
                    <ServiceRowActions service={s} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState title="No services yet" text="Add your first salon service." />
      )}
    </div>
  );
}
