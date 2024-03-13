import 'dotenv/config';
// import { migrate } from 'drizzle-orm/mysql2/migrator';
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/drizzle/drizzle.schema'

(async () => {

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const db = drizzle(client, { schema })
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle' });
  // Don't forget to close the connection, otherwise the script will hang
  await client.end()
})()
