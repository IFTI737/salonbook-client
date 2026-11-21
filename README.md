# SalonBook Client

**SalonBook** is a salon appointment booking platform. Customers browse salon services, book a date and time slot, and pay online. Admins manage services, appointments, users and payments.

## Features (built step by step)

- Customer and Admin roles with separate dashboards
- Email/password and Google sign in (Better Auth)
- Admin accounts cannot be created from the public Sign Up page
- Browse and search services, filter by category, sort by price
- Book an appointment with a date and a predefined time slot
- Pay online with Stripe Checkout
- Light, Dark and Auto theme, responsive design

## Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, shadcn/ui
- Better Auth (MongoDB adapter, JWT plugin, Google)
- Stripe Checkout
- imgbb image upload
- Deployed on Vercel

## Installation

```bash
git clone https://github.com/IFTI737/salonbook-client.git
cd salonbook-client
npm install
```

## Run Locally

1. Copy `.env.example` to `.env` and fill in the values.
2. Start the server API first (see the server repository), then run:

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment Variables

Only the names are listed here. Never commit your real `.env` file.

| Name | Purpose |
| --- | --- |
| `DB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Better Auth signing secret |
| `BETTER_AUTH_URL` | Base URL of this app |
| `NEXT_PUBLIC_API_URL` | Express server base URL |
| `GOOGLE_CLIENT_ID` | Google OAuth client id |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_IMGBB_KEY` | imgbb API key for image upload |

## Links

- Live site: _add after deploy_
- Server repository: https://github.com/IFTI737/salonbook-server
- Client repository: https://github.com/IFTI737/salonbook-client
