"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { sidebarItems } from "./nav";

export default function SidebarLinks({
  role,
  onNavigate,
}: {
  role: "customer" | "admin";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = sidebarItems[role];

  return (
    <nav className="grid gap-1">
      {items.map(({ label, href, icon: Icon }) => {
        // "Overview" is only active on its exact path, the others also on sub-pages
        const isRoot = href === `/dashboard/${role}`;
        const active = isRoot ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
