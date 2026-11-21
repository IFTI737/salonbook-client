import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

// Private routes: if there is no session, send the user to /sign-in and
// remember where they wanted to go. A logged-in user is never redirected,
// so reloading a private page keeps them on it.
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // /services (browse) is public, but /services/<id> (details + booking) is private
  matcher: ["/dashboard/:path*", "/services/:path+"],
};
