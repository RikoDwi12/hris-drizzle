import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/drizzle.schema'

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>
  ) { }
  async getAll() {
    const data = await this.db.select().from(schema.role)
    console.log(data)
    return {
      data: data
    }
  }
}
