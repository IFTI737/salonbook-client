"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import type { ActionResult } from "./appointments";

export type ServiceInput = {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
};

// Every service change also refreshes the public pages that show services.
function refreshServicePages() {
  revalidatePath("/", "layout");
}

export async function createService(input: ServiceInput): Promise<ActionResult> {
  const res = await apiFetch<Service>("/services", { method: "POST", body: JSON.stringify(input), withAuth: true });
  if (res.success) refreshServicePages();
  return { success: res.success, message: res.message };
}

export async function updateService(id: string, input: Partial<ServiceInput>): Promise<ActionResult> {
  const res = await apiFetch<Service>(`/services/${id}`, { method: "PATCH", body: JSON.stringify(input), withAuth: true });
  if (res.success) refreshServicePages();
  return { success: res.success, message: res.message };
}

export async function setServiceStatus(id: string, status: "active" | "inactive"): Promise<ActionResult> {
  const res = await apiFetch(`/services/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }), withAuth: true });
  if (res.success) refreshServicePages();
  return { success: res.success, message: res.message };
}

export async function deleteService(id: string): Promise<ActionResult> {
  const res = await apiFetch(`/services/${id}`, { method: "DELETE", withAuth: true });
  if (res.success) refreshServicePages();
  return { success: res.success, message: res.message };
}
