// The 7 service categories from the assignment.
export const SERVICE_CATEGORIES = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

// Fixed time slots a customer can pick when booking.
export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
] as const;

export type Role = "customer" | "admin";

// Each role has its own dashboard.
export const getDashboardPath = (role?: string | null) =>
  role === "admin" ? "/dashboard/admin" : "/dashboard/customer";
