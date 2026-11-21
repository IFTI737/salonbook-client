"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { Appointment } from "@/lib/types";

export type ActionResult = { success: boolean; message: string };

// Customer books a service. The server checks the role, the slot and the price.
export async function bookAppointment(input: {
  serviceId: string;
  appointmentDate: string;
  timeSlot: string;
  message: string;
}): Promise<ActionResult> {
  const res = await apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true,
  });
  if (res.success) revalidatePath("/dashboard/customer", "layout");
  return { success: res.success, message: res.message };
}

// Customer cancels their own pending appointment.
export async function cancelMyAppointment(id: string): Promise<ActionResult> {
  const res = await apiFetch(`/appointments/${id}/cancel`, { method: "PATCH", withAuth: true });
  if (res.success) revalidatePath("/dashboard/customer", "layout");
  return { success: res.success, message: res.message };
}

// Admin confirms or cancels any appointment.
export async function setAppointmentStatus(id: string, status: "confirmed" | "cancelled"): Promise<ActionResult> {
  const res = await apiFetch(`/appointments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    withAuth: true,
  });
  if (res.success) revalidatePath("/dashboard/admin", "layout");
  return { success: res.success, message: res.message };
}
