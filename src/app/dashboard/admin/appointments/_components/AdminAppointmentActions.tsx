"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { setAppointmentStatus } from "@/lib/action/appointments";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Pending -> Confirm or Cancel. Confirmed but unpaid -> Cancel. Paid or cancelled -> nothing.
export default function AdminAppointmentActions({ appointment }: { appointment: Appointment }) {
  const [busy, setBusy] = useState<"" | "confirmed" | "cancelled">("");

  const change = async (status: "confirmed" | "cancelled") => {
    setBusy(status);
    const res = await setAppointmentStatus(appointment._id, status);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
    setBusy("");
  };

  const canConfirm = appointment.status === "pending";
  const canCancel = appointment.status !== "cancelled" && appointment.paymentStatus !== "paid";

  if (!canConfirm && !canCancel) return <span className="text-xs text-muted-foreground">No action</span>;

  return (
    <div className="flex justify-end gap-1.5">
      {canConfirm && (
        <Button size="sm" onClick={() => change("confirmed")} disabled={!!busy}>
          {busy === "confirmed" ? <Spinner /> : <Check />} Confirm
        </Button>
      )}
      {canCancel && (
        <Button size="sm" variant="destructive" onClick={() => change("cancelled")} disabled={!!busy}>
          {busy === "cancelled" ? <Spinner /> : <X />} Cancel
        </Button>
      )}
    </div>
  );
}
