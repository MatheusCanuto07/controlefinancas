import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { db } from "$lib/db/db"; 
import * as authSchemas from "$lib/db/schema/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: authSchemas,
  }),
  emailAndPassword: {
    enabled: true, 
  }, 
  trustedOrigins: [
    "http://localhost:5173", 
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [])
  ],
  session: {
    cookieCache: {
      expiresIn: 604800,
		  updateAge: 86400,
			enabled: true,
			maxAge: 30000,
      storeSessionInDatabase: true,
		  preserveSessionInDatabase: false,
		}
  },
  plugins: [sveltekitCookies(getRequestEvent)],

});

