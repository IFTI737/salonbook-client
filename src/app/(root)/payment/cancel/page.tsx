import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Payment Cancelled" };

// Stripe sends the customer here if they leave the checkout page. Nothing was charged.
export default function PaymentCancelPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-20">
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-500/15 text-red-600 [&_svg]:size-8">
          <XCircle />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Payment cancelled</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          No money was taken. Your appointment is still confirmed, and you can pay any time from My Appointments.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard/customer/appointments" className={buttonVariants({ size: "lg" })}>
            Back to My Appointments
          </Link>
          <Link href="/" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
