import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshGuard } from 'src/common/guards/refresh.guard';
import { RefreshToken } from '../application/refresh.token';
import { ResendCode } from '../application/resend.code';
import { SignInStepOne } from '../application/sign.in.step.one';
import { SignInStepTwo } from '../application/sign.in.step.two';
import { SignUp } from '../application/sign.up';
import { SignInRequestDto } from './request-dto/sign.in.request.dto';
import { SignUpRequestDto } from './request-dto/sign.up.request.dto';
import { VerifyCode } from './request-dto/verify.code.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('signup')
  async signUp(@Body() body: SignUpRequestDto) {
    const handle = new SignUp(body);
    return await this.commandBus.execute(handle);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() body: SignInRequestDto) {
    const handle = new SignInStepOne(body);
    return await this.commandBus.execute(handle);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Attached 'accessToken' from API signIn" })
  @Post('verify')
  async verify(
    @Body() body: VerifyCode,
    @GetUser() user: { id: string; email: string },
  ) {
    const handle = new SignInStepTwo({ userId: user.id, code: body.code });
    return await this.commandBus.execute(handle);
  }

  @ApiBearerAuth()
  @Public()
  @ApiOperation({ summary: "Attached 'refreshToken' from API signIn" })
  @UseGuards(RefreshGuard)
  @Post('resend')
  async resendCode(
    @GetUser() user: { id: string; email: string; refreshToken: string },
  ) {
    const handle = new ResendCode({
      userId: user.id,
      refreshToken: user.refreshToken,
    });
    return await this.commandBus.execute(handle);
  }

  @ApiBearerAuth()
  @Public()
  @ApiOperation({ summary: "Attached 'refreshToken' from API verify" })
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refreshToken(
    @GetUser() user: { id: string; email: string; refreshToken: string },
  ) {
    const handle = new RefreshToken({
      userId: user.id,
      refreshToken: user.refreshToken,
    });
    return await this.commandBus.execute(handle);
  }
}
