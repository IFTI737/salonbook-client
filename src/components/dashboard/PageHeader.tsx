// Title row at the top of every dashboard page (mono eyebrow, big title, dashed rule).
export default function PageHeader({
  title,
  text,
  eyebrow = "Dashboard",
  children,
}: {
  title: string;
  text?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-8 flex flex-col gap-4 border-b border-dashed pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {text && <p className="mt-2 text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
