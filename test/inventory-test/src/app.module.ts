import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './inventory/inventory.module';
import { ItemService } from './item/item.service';
import { ItemModule } from './item/item.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: AppConfig.validate }),
    DrizzleModule,
    InventoryModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfig, ItemService],
  exports: [AppConfig]
})
export class AppModule { }
