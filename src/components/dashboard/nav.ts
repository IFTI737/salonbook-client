import {
  CalendarCheck,
  LayoutDashboard,
  Receipt,
  Scissors,
  Search,
  UserRound,
  Users,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: typeof LayoutDashboard };

// Sidebar links for each role. The server still checks the role on every page and API.
export const sidebarItems: Record<"customer" | "admin", NavItem[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Appointments", href: "/dashboard/customer/appointments", icon: CalendarCheck },
    { label: "My Profile", href: "/dashboard/customer/profile", icon: UserRound },
    { label: "Browse Services", href: "/services", icon: Search },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Services", href: "/dashboard/admin/services", icon: Scissors },
    { label: "Manage Appointments", href: "/dashboard/admin/appointments", icon: CalendarCheck },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
    { label: "My Profile", href: "/dashboard/admin/profile", icon: UserRound },
  ],
};
