import { getSession } from "@/lib/session";
import PageHeader from "@/components/dashboard/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = { title: "My Profile" };

export default async function AdminProfilePage() {
  const session = await getSession();
  if (!session) return null;
  return (
    <div>
      <PageHeader title="My Profile" text="Update your name and profile photo." />
      <ProfileForm user={session.user} />
    </div>
  );
}
