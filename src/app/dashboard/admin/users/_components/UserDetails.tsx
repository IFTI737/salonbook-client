"use client";

import { Eye } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { AppUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StatusBadge from "@/components/shared/StatusBadge";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-dashed py-2 text-sm last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

// "Details" button that opens a popup with the full profile of one registered user.
export default function UserDetails({ user: u }: { user: AppUser }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" aria-label={`View details of ${u.name}`} />}>
        <Eye /> Details
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <Avatar className="size-20 ring-4 ring-primary/20">
            {u.image && <AvatarImage src={u.image} alt={u.name} referrerPolicy="no-referrer" />}
            <AvatarFallback className="text-xl">{getInitials(u.name)}</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-lg">{u.name}</DialogTitle>
          <DialogDescription>{u.email}</DialogDescription>
        </DialogHeader>
        <dl>
          <Row label="Role">
            <StatusBadge status={u.role} />
          </Row>
          <Row label="Status">
            <StatusBadge status={u.isBlocked ? "blocked" : "active"} />
          </Row>
          <Row label="Phone">{u.phone || <span className="font-normal text-muted-foreground">Not added</span>}</Row>
          <Row label="Appointments">{u.appointmentCount ?? 0}</Row>
          <Row label="Joined">{new Date(u.createdAt).toLocaleDateString("en-US", { dateStyle: "long" })}</Row>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
