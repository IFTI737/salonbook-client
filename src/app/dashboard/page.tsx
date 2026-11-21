import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getDashboardPath } from "@/lib/constants";

// /dashboard sends each user to their own dashboard (admin or customer).
export default async function DashboardRedirectPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.isBlocked) redirect("/blocked");
  redirect(getDashboardPath(session.user.role));
}
