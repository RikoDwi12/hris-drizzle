import { Global, Module } from '@nestjs/common';
// import { DrizzleService } from './drizzle.service';
import { ConfigService } from '@nestjs/config';
import { Client, Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './drizzle.schema'
import { AppConfig } from 'src/app.config';
import { AppModule } from 'src/app.module';
import { generateConnectionString } from 'src/utils';

export const PG_CONNECTION = 'PG_CONNECTION';

const DB_ENV = [
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_NAME"
]

@Global()
@Module({
  providers: [{
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const env = {}
      for (const envKey of DB_ENV) env[envKey] = configService.get(envKey)

      const connectionString = generateConnectionString(env)
      const client = new Client({ connectionString: connectionString });

      await client.connect();
      const db = drizzle(client, { schema })

      return db
    },
  }],
  exports: [PG_CONNECTION]
})
export class DrizzleModule {

}
