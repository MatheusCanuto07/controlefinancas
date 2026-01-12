import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
console.log('DATABASE_URL:', process);
if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

if (!process.env.DATABASE_AUTH_TOKEN) {
	throw new Error('DATABASE_AUTH_TOKEN is not set');
}

export default defineConfig({
	dialect: 'turso',
	schema: 'src/lib/db/schema/index.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN
	}
});
