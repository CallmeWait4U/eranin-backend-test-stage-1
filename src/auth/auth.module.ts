import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy } from 'src/common/strategies/access.strategy';
import { RefreshStrategy } from 'src/common/strategies/refresh.strategy';
import { RefreshTokenHandler } from './application/handler/refresh.token.handler';
import { ResendCodeHandler } from './application/handler/resend.code.handler';
import { SignInStepOneHandler } from './application/handler/sign.in.step.one.handler';
import { SignInStepTwoHandler } from './application/handler/sign.in.step.two.handler';
import { SignUpHandler } from './application/handler/sign.up.handler';
import { AuthController } from './presentation/auth.controller';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [JwtModule.register({}), CqrsModule],
  providers: [
    AccessStrategy,
    RefreshStrategy,
    AuthRepository,
    SignUpHandler,
    SignInStepOneHandler,
    SignInStepTwoHandler,
    RefreshTokenHandler,
    ResendCodeHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
