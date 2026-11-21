// Title row at the top of every dashboard page.
export default function PageHeader({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {text && <p className="mt-1 text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
