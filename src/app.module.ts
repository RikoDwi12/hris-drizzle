import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: AppConfig.validate }),
    DrizzleModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfig],
  exports: [AppConfig]
})
export class AppModule { }
