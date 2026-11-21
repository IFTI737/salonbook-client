"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/constants";

// Public visitors see Home + Browse Services. Logged-in users see Home + Dashboard.
export default function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const items = session
    ? [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: getDashboardPath(session.user.role) },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Browse Services", href: "/services" },
      ];

  return (
    <ul className={cn("flex gap-1", className)}>
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
