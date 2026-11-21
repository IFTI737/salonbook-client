"use client";

import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { CATEGORY_DETAILS } from "@/lib/constants";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
];

const heading = "mb-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase";
const linkClass = "inline-block transition-[color,translate] hover:translate-x-1 hover:text-primary";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Beauty tips and offers are on their way.");
    e.currentTarget.reset();
  };

  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            SalonBook is a modern salon in the heart of Dhanmondi. Browse our services, pick a free slot and pay
            online, so your visit starts the moment you walk in.
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <form onSubmit={handleSubscribe} className="flex max-w-sm items-center gap-2 rounded-full border bg-background p-1 pl-4 focus-within:ring-2 focus-within:ring-primary/40">
            <input type="email" required placeholder="Email for offers" aria-label="Email address" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            <button type="submit" aria-label="Subscribe" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-105">
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {CATEGORY_DETAILS.map((c) => (
              <li key={c.name}>
                <Link href={`/services?category=${encodeURIComponent(c.name)}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8 sm:col-span-2 lg:col-span-4">
          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> +880 1700-000000</li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@salonbook.com</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> House 12, Road 5, Dhanmondi, Dhaka 1209, Bangladesh</li>
            </ul>
          </div>
          <div>
            <h3 className={heading}>Opening Hours</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center justify-between gap-4 border-b border-dashed pb-2">
                <span className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Saturday - Thursday</span>
                <span className="font-mono text-xs">09:00 AM - 07:00 PM</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Friday</span>
                <span className="font-mono text-xs">03:00 PM - 08:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden className="container mx-auto overflow-hidden px-4">
        <p className="text-outline translate-y-[18%] text-center font-heading text-[18vw] leading-none font-extrabold tracking-tighter text-foreground/15 select-none xl:text-[14rem]">
          SalonBook
        </p>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} SalonBook. All rights reserved.</p>
          <p className="font-mono text-xs tracking-wider uppercase">Made with care in Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
