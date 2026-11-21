import { requireRole } from "@/lib/session";

// Only customers can open anything under /dashboard/customer.
export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  await requireRole("customer");
  return <>{children}</>;
}
