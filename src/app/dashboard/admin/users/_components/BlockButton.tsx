"use client";

import { useState } from "react";
import { Ban, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { setUserBlocked } from "@/lib/action/users";
import type { AppUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function BlockButton({ user, isSelf }: { user: AppUser; isSelf: boolean }) {
  const [busy, setBusy] = useState(false);

  // admins (including yourself) cannot be blocked; the server checks this too
  if (user.role === "admin" || isSelf) return <span className="text-xs text-muted-foreground">—</span>;

  const toggle = async () => {
    setBusy(true);
    const res = await setUserBlocked(user._id, !user.isBlocked);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
    setBusy(false);
  };

  return (
    <Button size="sm" variant={user.isBlocked ? "outline" : "destructive"} onClick={toggle} disabled={busy}>
      {busy ? <Spinner /> : user.isBlocked ? <CircleCheck /> : <Ban />}
      {user.isBlocked ? "Unblock" : "Block"}
    </Button>
  );
}
