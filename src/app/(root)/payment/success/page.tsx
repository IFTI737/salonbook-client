import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PaymentStatus from "./_components/PaymentStatus";

export const metadata = { title: "Payment Successful" };

// Stripe sends the customer here after paying. This page is private (see proxy.ts).
export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ appointmentId?: string }>;
}) {
  const { appointmentId } = await searchParams;

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-20">
      {appointmentId ? (
        <PaymentStatus appointmentId={appointmentId} />
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Nothing to show here</h1>
          <p className="mt-3 text-muted-foreground">Open My Appointments to see the status of your payments.</p>
          <Link href="/dashboard/customer/appointments" className={buttonVariants({ size: "lg", className: "mt-8" })}>
            View My Appointments
          </Link>
        </div>
      )}
    </section>
  );
}
