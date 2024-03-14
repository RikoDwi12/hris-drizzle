import 'dotenv/config';
// import { migrate } from 'drizzle-orm/mysql2/migrator';
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/drizzle/drizzle.schema'
import { generateConnectionString } from 'src/utils';

(async () => {
  console.log(generateConnectionString())
  const client = new Client({
    connectionString: generateConnectionString()
  });
  await client.connect();
  const db = drizzle(client, { schema })
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle' });
  // Don't forget to close the connection, otherwise the script will hang
  console.log("migration sukses")
  await client.end()
})()
