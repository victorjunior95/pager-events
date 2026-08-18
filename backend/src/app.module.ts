import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [PrismaModule, SystemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
