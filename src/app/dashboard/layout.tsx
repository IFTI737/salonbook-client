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
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-8 border-r bg-card p-5 lg:flex">
        <Logo />
        <div>
          <p className="mb-3 flex items-center gap-2 px-4 font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-5 bg-primary/60" />
            {role === "admin" ? "Admin panel" : "My account"}
          </p>
          <SidebarLinks role={role} />
        </div>
        <div className="relative mt-auto overflow-hidden rounded-3xl bg-foreground p-5 text-background">
          <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-primary/40 blur-2xl" />
          <p className="relative font-mono text-[10px] tracking-[0.2em] text-spotlight uppercase">Opening hours</p>
          <p className="relative mt-2 text-sm font-semibold">Sat - Thu · 9 AM - 7 PM</p>
          <p className="relative text-xs text-background/60">Friday · 3 PM - 8 PM</p>
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
