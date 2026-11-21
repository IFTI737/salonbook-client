import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { getInitials } from "@/lib/utils";
import type { AppUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import BlockButton from "./_components/BlockButton";

export const metadata = { title: "Manage Users" };

export default async function ManageUsersPage() {
  const [session, res] = await Promise.all([getSession(), apiFetch<AppUser[]>("/users", { withAuth: true })]);
  if (!res.success) throw new Error(res.message);
  const users = res.data;

  return (
    <div>
      <PageHeader title="Manage Users" text="Blocked customers are signed out and cannot book until unblocked." />
      {users.length ? (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {u.image && <AvatarImage src={u.image} alt={u.name} referrerPolicy="no-referrer" />}
                        <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={u.role} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={u.isBlocked ? "blocked" : "active"} />
                  </TableCell>
                  <TableCell>{new Date(u.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</TableCell>
                  <TableCell className="text-right">
                    <BlockButton user={u} isSelf={u._id === session?.user.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState title="No users yet" />
      )}
    </div>
  );
}
