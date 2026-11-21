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

const unsplash = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Extra details for each category: short label, photo and one line of text (home deck cards, footer).
export const CATEGORY_DETAILS: { name: ServiceCategory; label: string; image: string; blurb: string }[] = [
  { name: "Haircut & Styling", label: "Cut & Style", image: unsplash("photo-1560066984-138dadb4c035"), blurb: "Precision cuts, fades, blow dries and event styling." },
  { name: "Hair Coloring", label: "Color", image: unsplash("photo-1522337360788-8b13dee7a37e"), blurb: "Balayage, highlights, global color and root touch-ups." },
  { name: "Hair Treatment", label: "Treatments", image: unsplash("photo-1527799820374-dcf8d9d4a388"), blurb: "Keratin, deep conditioning and scalp repair." },
  { name: "Facial & Skincare", label: "Skincare", image: unsplash("photo-1570172619644-dfd03ed5d881"), blurb: "Glow facials, cleanups and skin hydration." },
  { name: "Makeup", label: "Makeup", image: unsplash("photo-1487412947147-5cebf100ffc2"), blurb: "Bridal, party and photo-ready looks." },
  { name: "Manicure & Pedicure", label: "Nails", image: unsplash("photo-1604654894610-df63bc536371"), blurb: "Gel polish, nail art and spa pedicures." },
  { name: "Spa & Massage", label: "Spa", image: unsplash("photo-1544161515-4ab6ce6db874"), blurb: "Aromatherapy, hot stone and full body massage." },
];
