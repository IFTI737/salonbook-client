import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { ObjectId } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "./mongo";

// On the live Vercel site we always use the real production address,
// so Google never sends people back to localhost even if BETTER_AUTH_URL was copied wrong.
const productionUrl =
  process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
const baseURL = productionUrl || process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  // Same database ("salonbook") the Express server uses. See lib/mongo.ts.
  database: mongodbAdapter(db),
  trustedOrigins: [baseURL],

  user: {
    additionalFields: {
      // input:false means a user can NOT send these values when registering.
      // Everyone starts as a customer. An admin is created only on the server side.
      role: {
        type: ["customer", "admin"],
        input: false,
        defaultValue: "customer",
      },
      isBlocked: {
        type: "boolean",
        input: false,
        defaultValue: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // after register the user goes to the Sign In page
    autoSignIn: false,
  },

  // Blocked users cannot start a new session (email or Google).
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const user = await db
            .collection("user")
            .findOne({ _id: new ObjectId(String(session.userId)) });
          if (user?.isBlocked) {
            throw new APIError("FORBIDDEN", {
              message: "Your account has been blocked. Please contact the salon.",
            });
          }
        },
      },
    },
  },

  // The form checks the password rules too, but the server must never trust the form.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const password = String(ctx.body?.password ?? "");
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must have at least one uppercase and one lowercase letter",
        });
      }
    }),
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },

  // The jwt plugin gives us a token that the Express server can verify.
  plugins: [jwt()],

  session: {
    // session lives in an HTTPOnly cookie, cached as a JWT for 7 days
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
