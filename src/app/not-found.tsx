import { Scissors } from "lucide-react";
import StatusPage from "@/components/shared/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Page not found"
      title="This page got a little too much trimmed off."
      text="The link may be broken or the page was moved. Let's get you back to something beautiful."
      icon={<Scissors />}
    />
  );
}
