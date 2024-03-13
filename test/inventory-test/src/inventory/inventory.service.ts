import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/drizzle/drizzle.module';
import * as schema from '../drizzle/drizzle.schema'
import * as dayjs from 'dayjs'

@Injectable()
export class InventoryService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>
  ) { }

  async getAll() {
    const data = await this.db.select().from(schema.inventory)
    console.log(data)
    return {
      data: data
    }
  }

  async addInventory() {
    const newInventory = await this.db.insert(schema.inventory).values({
      name: 'fdfdfd',
      day: dayjs().day()
    }).returning()
    return {
      message: 'new inventory added',
      data: newInventory
    }
  }
}
