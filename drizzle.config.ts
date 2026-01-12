import { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: "./src/lib/db/schema",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  dialect: 'sqlite'
} satisfies Config;