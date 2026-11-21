"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { ActionResult } from "./appointments";

// Admin blocks or unblocks a customer. The server refuses to block admins or yourself.
export async function setUserBlocked(id: string, isBlocked: boolean): Promise<ActionResult> {
  const res = await apiFetch(`/users/${id}/block`, {
    method: "PATCH",
    body: JSON.stringify({ isBlocked }),
    withAuth: true,
  });
  if (res.success) revalidatePath("/dashboard/admin", "layout");
  return { success: res.success, message: res.message };
}
