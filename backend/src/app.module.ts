import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import authConfig from './config/auth.config';
import { AuthModule } from './modules/auth/auth.module';
import { SystemModule } from './modules/system/system.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AreasModule } from './modules/areas/areas.module';
import { DemandsModule } from './modules/demands/demands.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    PrismaModule,
    SystemModule,
    AuthModule,
    UsersModule,
    AreasModule,
    DemandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
