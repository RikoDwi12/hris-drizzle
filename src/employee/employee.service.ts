import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/drizzle.schema'
import { eq, lt, gte, ne } from 'drizzle-orm';
@Injectable()
export class EmployeeService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>
  ) { }
  async getAll() {
    const data = await this.db
                .select()
                .from(schema.role)
                .where(eq(schema.role.id,"1"))
    return {
      data: data
    }
  }

  async getDetail() {
    const result = await this.db.query.role.findMany({
      columns : {
        id : true
      },
      orderBy : (role, {asc})=> [asc(role.id)]
    })
    return result
  }
}
