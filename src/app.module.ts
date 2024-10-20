import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AccessGuard } from './common/guards/access.guard';
import { DatabaseModule } from './libs/database.module';
import { EmailModule } from './libs/email.module';
import { UtilityModule } from './libs/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilityModule,
    DatabaseModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
