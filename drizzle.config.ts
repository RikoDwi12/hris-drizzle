import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
dotenv.config();
console.log("process.env.DB_URL",process.env.DATABASE_URL)
export default {
  schema: './src/drizzle/drizzle.schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  }
} satisfies Config;
