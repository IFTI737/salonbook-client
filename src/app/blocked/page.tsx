import { Ban } from "lucide-react";
import StatusPage from "@/components/shared/StatusPage";

export const metadata = { title: "Account Blocked" };

export default function BlockedPage() {
  return (
    <StatusPage
      code="403"
      eyebrow="Account blocked"
      title="Your account is blocked"
      text="You cannot use protected features right now. Please contact the salon if you think this is a mistake."
      icon={<Ban />}
    />
  );
}
