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
              "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-[color,background-color,translate]",
              active ? "bg-foreground text-background" : "text-muted-foreground hover:translate-x-1 hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className={cn("size-4", active && "text-primary")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
