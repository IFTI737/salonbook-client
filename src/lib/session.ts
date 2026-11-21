import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/constants";

// Returns the logged-in session on the server, or null.
// disableCookieCache makes Better Auth re-read the user from MongoDB,
// so a role change or a block is seen immediately (not after 7 days).
export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  });
}

// Use at the top of a protected layout/page. The role comes from the database, never from the browser.
export async function requireRole(role: Role) {
  const session = await getSession();

  if (!session) redirect("/sign-in");
  if (session.user.isBlocked) redirect("/blocked");
  if (session.user.role !== role) redirect("/unauthorized");

  return session;
}
