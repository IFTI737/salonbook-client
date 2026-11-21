// Small display helpers used across the app.

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

export const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};

// "2026-12-05" -> "Sat, Dec 5, 2026" (read as a plain date, no timezone shift)
export const formatDate = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

// Today's date as "YYYY-MM-DD" in the visitor's own timezone.
export const todayString = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
