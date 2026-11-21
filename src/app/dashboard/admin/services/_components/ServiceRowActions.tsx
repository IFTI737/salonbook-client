"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Power, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteService, setServiceStatus } from "@/lib/action/services";
import type { Service } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
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

export default function ServiceRowActions({ service }: { service: Service }) {
  const [busy, setBusy] = useState(false);
  const nextStatus = service.status === "active" ? "inactive" : "active";

  const toggle = async () => {
    setBusy(true);
    const res = await setServiceStatus(service._id, nextStatus);
    res.success ? toast.success(res.message) : toast.error(res.message);
    setBusy(false);
  };

  const remove = async () => {
    setBusy(true);
    const res = await deleteService(service._id);
    res.success ? toast.success("Service deleted") : toast.error(res.message);
    setBusy(false);
  };

  return (
    <div className="flex justify-end gap-1.5">
      <Link
        href={`/dashboard/admin/services/${service._id}/edit`}
        className={buttonVariants({ variant: "outline", size: "sm" })}
        aria-label={`Edit ${service.serviceName}`}
      >
        <Pencil /> Edit
      </Link>
      <Button variant="outline" size="sm" onClick={toggle} disabled={busy}>
        {busy ? <Spinner /> : <Power />} {service.status === "active" ? "Deactivate" : "Activate"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive" size="sm" disabled={busy} aria-label={`Delete ${service.serviceName}`} />}>
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{service.serviceName}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the service for good. Services with upcoming bookings cannot be deleted. Deactivate them instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={remove}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
