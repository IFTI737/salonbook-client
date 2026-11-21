import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import UserMenu from "@/components/shared/UserMenu";
import SidebarLinks from "@/components/dashboard/SidebarLinks";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

// Shared dashboard frame: sidebar (by role) + top bar. Each role folder has its own guard too.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.isBlocked) redirect("/blocked");

  const role = session.user.role === "admin" ? "admin" : "customer";

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r bg-card/60 p-5 lg:flex">
        <Logo />
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {role === "admin" ? "Admin panel" : "My account"}
          </p>
          <SidebarLinks role={role} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2">
            <MobileSidebar role={role} />
            <Logo className="lg:hidden" />
            <p className="hidden text-sm text-muted-foreground lg:block">
              Welcome back, <span className="font-medium text-foreground">{session.user.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
