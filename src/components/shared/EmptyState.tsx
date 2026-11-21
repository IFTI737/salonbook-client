import { Inbox } from "lucide-react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

// Friendly message for empty lists.
export default function EmptyState({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <Empty className="rounded-2xl border border-dashed py-14">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {text && <EmptyDescription>{text}</EmptyDescription>}
      </EmptyHeader>
      {children}
    </Empty>
  );
}
