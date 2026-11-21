import { ShieldAlert } from "lucide-react";
import StatusPage from "@/components/shared/StatusPage";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <StatusPage
      code="403"
      eyebrow="Staff only"
      title="You are not allowed here"
      text="Your account does not have permission to open this page."
      icon={<ShieldAlert />}
    />
  );
}
