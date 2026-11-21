import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "../../_components/ServiceForm";

export const metadata = { title: "Edit Service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await apiFetch<Service>(`/services/${id}`);
  if (!res.success) notFound();

  return (
    <div>
      <PageHeader title="Edit service" text={res.data.serviceName} />
      <ServiceForm service={res.data} />
    </div>
  );
}
