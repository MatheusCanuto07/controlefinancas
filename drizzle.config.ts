import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_URL is not set');

console.log(process.env);

export default defineConfig({
	dialect: 'turso',
	schema: 'src/lib/db/schema/index.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	}
});