import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { ApiResponse } from "@/lib/types";

// Base URL of the Express server (no trailing slash).
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Gets the Better Auth JWT for the logged-in user. Express verifies it with our public keys.
export async function getToken() {
  try {
    const { token } = await auth.api.getToken({ headers: await headers() });
    return token;
  } catch {
    return null;
  }
}

// Calls the Express API. With `withAuth`, the user's JWT is sent as a Bearer token.
// Never throws: always returns { success, message, data }.
export async function apiFetch<T>(
  path: string,
  { withAuth = false, ...init }: RequestInit & { withAuth?: boolean } = {},
): Promise<ApiResponse<T>> {
  const reqHeaders: Record<string, string> = { "Content-Type": "application/json" };

  if (withAuth) {
    const token = await getToken();
    if (!token) return { success: false, message: "Please sign in again", data: null as T };
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { ...reqHeaders, ...(init.headers as Record<string, string>) },
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);
    if (!body) return { success: false, message: `Server error (${res.status})`, data: null as T };
    return body as ApiResponse<T>;
  } catch {
    return { success: false, message: "Could not reach the server. Please try again.", data: null as T };
  }
}
