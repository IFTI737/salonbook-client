import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import type { auth } from "./auth";

// No baseURL: the auth API is on the same domain (/api/auth).
// inferAdditionalFields lets TypeScript know about user.role and user.isBlocked.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
