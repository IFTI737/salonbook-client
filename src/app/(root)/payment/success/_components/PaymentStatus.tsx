"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { getPaymentStatus } from "@/lib/action/payments";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type View = "processing" | "paid" | "slow" | "error";

// Stripe tells our server about the payment through a webhook, a moment after the customer returns.
// So this page asks the server every 2 seconds until the appointment shows as paid.
export default function PaymentStatus({ appointmentId }: { appointmentId: string }) {
  const [view, setView] = useState<View>("processing");
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let tries = 0;

    async function check() {
      const res = await getPaymentStatus(appointmentId);
      if (cancelled) return;
      if (!res.success) {
        setError(res.message);
        setView("error");
        return;
      }
      setServiceName(res.serviceName || "");
      if (res.paymentStatus === "paid") {
        setView("paid");
        return;
      }
      tries += 1;
      if (tries >= 15) {
        setView("slow"); // about 30 seconds passed
        return;
      }
      setTimeout(check, 2000);
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [appointmentId]);

  const buttons = (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link href="/dashboard/customer/appointments" className={buttonVariants({ size: "lg" })}>
        View My Appointments
      </Link>
      <Link href="/services" className={buttonVariants({ size: "lg", variant: "outline" })}>
        Browse Services
      </Link>
    </div>
  );

  if (view === "processing") {
    return (
      <div role="status" className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:size-7">
          <Spinner />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Processing your payment</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Please wait a moment while we confirm it with Stripe. Do not close this page.
        </p>
      </div>
    );
  }

  if (view === "paid") {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 [&_svg]:size-8">
          <CheckCircle2 />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Payment successful</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thank you! Your payment{serviceName ? ` for ${serviceName}` : ""} was received and your appointment is marked as paid.
        </p>
        {buttons}
      </div>
    );
  }

  if (view === "slow") {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 [&_svg]:size-8">
          <Clock />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Still confirming your payment</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          This is taking longer than usual. If you paid, your appointment will show as paid in My Appointments in a minute or two. You will not be charged twice.
        </p>
        {buttons}
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight">We could not check your payment</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{error}</p>
      {buttons}
    </div>
  );
}
