import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
import { generateConnectionString } from 'src/utils';
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

console.log(process.env)
export default {
  schema: './src/drizzle/drizzle.schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    // connectionString: process.env.DATABASE_URL,
    connectionString: generateConnectionString()
  }
} satisfies Config;
