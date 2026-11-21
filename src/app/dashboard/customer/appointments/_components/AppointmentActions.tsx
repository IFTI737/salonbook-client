"use client";

import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import { toast } from "sonner";
import { cancelMyAppointment } from "@/lib/action/appointments";
import { startPayment } from "@/lib/action/payments";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Pending -> Cancel. Confirmed and unpaid -> Pay Now. Anything else -> no action.
export default function AppointmentActions({ appointment }: { appointment: Appointment }) {
  const [busy, setBusy] = useState(false);

  const handleCancel = async () => {
    setBusy(true);
    const res = await cancelMyAppointment(appointment._id);
    if (res.success) toast.success("Appointment cancelled");
    else toast.error(res.message);
    setBusy(false);
  };

  // Pay Now: get a Stripe Checkout page from the server and go there.
  // The appointment is marked paid later, only by the Stripe webhook.
  const handlePay = async () => {
    setBusy(true);
    const res = await startPayment(appointment._id);
    if (res.success && res.redirectUrl) {
      window.location.href = res.redirectUrl;
      return; // keep the loader on while the browser leaves the page
    }
    toast.error(res.message);
    setBusy(false);
  };

  if (appointment.status === "pending") {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive" size="sm" disabled={busy} />}>
          {busy ? <Spinner /> : <X />} Cancel
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              {appointment.serviceName} on {appointment.appointmentDate} at {appointment.timeSlot}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleCancel}>
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (appointment.status === "confirmed" && appointment.paymentStatus === "unpaid") {
    return (
      <Button size="sm" onClick={handlePay} disabled={busy}>
        {busy ? <Spinner /> : <CreditCard />} {busy ? "Opening..." : "Pay Now"}
      </Button>
    );
  }

  return <span className="text-xs text-muted-foreground">No action</span>;
}
