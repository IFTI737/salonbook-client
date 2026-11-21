import { requireRole } from "@/lib/session";

// Only admins can open anything under /dashboard/admin.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("admin");
  return <>{children}</>;
}
