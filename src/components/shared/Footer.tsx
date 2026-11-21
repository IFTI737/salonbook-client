import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

// Simple inline icons (lucide has no brand icons)
const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" fill="currentColor" stroke="none" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" fill="currentColor" stroke="none" />,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo + description */}
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            SalonBook makes it easy to discover salon services, pick a time that suits you and pay online,
            so you spend less time waiting and more time feeling good.
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@salonbook.com</li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              House 12, Road 5, Dhanmondi, Dhaka 1209, Bangladesh
            </li>
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Opening Hours</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Sat - Thu: 9:00 AM - 7:00 PM</li>
            <li className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Friday: 3:00 PM - 8:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-5 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SalonBook. All rights reserved.
      </div>
    </footer>
  );
}
