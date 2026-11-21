"use server";

import { apiFetch } from "@/lib/api";

// Asks the server for a Stripe Checkout page for one appointment.
// The server checks that it is the customer's own, confirmed and unpaid appointment.
export async function startPayment(
  appointmentId: string,
): Promise<{ success: boolean; message: string; redirectUrl?: string }> {
  const res = await apiFetch<{ redirectUrl: string }>("/payments/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ appointmentId }),
    withAuth: true,
  });
  if (!res.success) return { success: false, message: res.message };
  return { success: true, message: res.message, redirectUrl: res.data.redirectUrl };
}

// The success page asks this every few seconds until the Stripe webhook marks the appointment paid.
export async function getPaymentStatus(
  appointmentId: string,
): Promise<{ success: boolean; message: string; paymentStatus?: "paid" | "unpaid"; serviceName?: string }> {
  const res = await apiFetch<{ paymentStatus: "paid" | "unpaid"; serviceName: string }>(
    `/payments/status/${appointmentId}`,
    { withAuth: true },
  );
  if (!res.success) return { success: false, message: res.message };
  return { success: true, message: res.message, paymentStatus: res.data.paymentStatus, serviceName: res.data.serviceName };
}
