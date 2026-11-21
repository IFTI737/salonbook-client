"use client";

import { Eye } from "lucide-react";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SafeImage from "@/components/shared/SafeImage";
import StatusBadge from "@/components/shared/StatusBadge";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-dashed py-2 text-sm last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

// "Details" button that opens a popup with everything about one appointment.
// The admin version (showCustomer) also shows who booked it.
export default function AppointmentDetails({
  appointment: a,
  showCustomer = false,
}: {
  appointment: Appointment;
  showCustomer?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" aria-label={`View details of ${a.serviceName}`} />}>
        <Eye /> Details
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{a.serviceName}</DialogTitle>
          <DialogDescription>{a.serviceCategory}</DialogDescription>
        </DialogHeader>

        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <SafeImage src={a.serviceImage} alt={a.serviceName} sizes="450px" />
        </div>

        <dl>
          {showCustomer && (
            <>
              <Row label="Customer">{a.customerName}</Row>
              <Row label="Email">{a.customerEmail}</Row>
            </>
          )}
          <Row label="Appointment date">{formatDate(a.appointmentDate)}</Row>
          <Row label="Time">{a.timeSlot}</Row>
          <Row label="Price">{formatPrice(a.servicePrice)}</Row>
          <Row label="Appointment status">
            <StatusBadge status={a.status} />
          </Row>
          <Row label="Payment status">
            <StatusBadge status={a.paymentStatus} />
          </Row>
          <Row label="Requested on">{formatDateTime(a.createdAt)}</Row>
          <Row label="Message">{a.message ? <span className="font-normal">{a.message}</span> : <span className="font-normal text-muted-foreground">No message</span>}</Row>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
