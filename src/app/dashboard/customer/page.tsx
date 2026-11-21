import { getSession } from "@/lib/session";

export const metadata = { title: "Customer Dashboard" };

// Temporary page. The real customer dashboard is built in later commits.
export default async function CustomerDashboardPage() {
  const session = await getSession();
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {session?.user.name} ({session?.user.role})
      </p>
    </main>
  );
}
