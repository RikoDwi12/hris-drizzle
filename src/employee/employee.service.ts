import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/drizzle/drizzle.module';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/drizzle.schema'
import { generateConnectionString } from 'src/utils';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/app.config';

@Injectable()
export class EmployeeService {
  constructor(
    // @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>
    private readonly appConfig: AppConfig
  ) { }
  async getAll() {

    const connectionString = generateConnectionString(this.appConfig.env)
    const client = new Client({ connectionString: connectionString });

    await client.connect();
    const db = drizzle(client, { schema })

    const data = await db.employee

    // const data = await this.db.select().from(schema.role)
    // const data = await this.db.employ
    console.log(data)
    return {
      data: data
    }
  }
}
