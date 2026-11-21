import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "../_components/ServiceForm";

export const metadata = { title: "Add Service" };

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="Add a new service" text="It goes live on the site right away (status: active)." />
      <ServiceForm />
    </div>
  );
}
