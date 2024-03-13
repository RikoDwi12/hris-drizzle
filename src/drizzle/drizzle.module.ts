import { Global, Module } from '@nestjs/common';
// import { DrizzleService } from './drizzle.service';
import { ConfigService } from '@nestjs/config';
import { Client, Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './drizzle.schema'
import { AppConfig } from 'src/app.config';
import { AppModule } from 'src/app.module';

export const PG_CONNECTION = 'PG_CONNECTION';

@Global()
@Module({
  providers: [{
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      // const connectionString = config.env.DATABASE_URL
      const connectionString = configService.get<string>('DATABASE_URL');
      console.log(connectionString)
      const client = new Client({
        connectionString: connectionString,
      });

      await client.connect();
      const db = drizzle(client, { schema })


      return db
    },
  }],
  exports: [PG_CONNECTION]
})
export class DrizzleModule {

}
