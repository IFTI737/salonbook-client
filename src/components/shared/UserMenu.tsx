"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) return <Skeleton className="size-10 rounded-full" />;

  if (!session) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link href="/sign-in" className={buttonVariants({ variant: "ghost", size: "lg", className: "rounded-full px-4" })}>
          Sign In
        </Link>
        <Link href="/sign-up" className={buttonVariants({ size: "lg", className: "rounded-full px-5" })}>
          Sign Up
        </Link>
      </div>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    await signOut();
    toast.success("You have been logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        openOnHover
        className="rounded-full ring-2 ring-primary/30 outline-none transition hover:ring-primary focus-visible:ring-primary"
      >
        <Avatar size="lg">
          {user.image && <AvatarImage src={user.image} alt={user.name} referrerPolicy="no-referrer" />}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col">
            <span className="truncate text-sm font-semibold text-foreground">{user.name}</span>
            <span className="truncate font-normal">{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
