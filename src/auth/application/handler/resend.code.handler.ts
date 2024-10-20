import { faker } from '@faker-js/faker/locale/vi';
import { ForbiddenException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { SignInResponseDto } from 'src/auth/presentation/response-dto/sign.in.response.dto';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { MailerDTO } from 'src/common/mailer.dto';
import { EmailService } from 'src/libs/email.module';
import { UtilityImplement } from 'src/libs/util.module';
import { ResendCode } from '../resend.code';

@CommandHandler(ResendCode)
export class ResendCodeHandler
  implements ICommandHandler<ResendCode, SignInResponseDto>
{
  @Inject()
  private readonly authRepository: AuthRepository;
  @Inject()
  private readonly emailService: EmailService;
  @Inject()
  private readonly util: UtilityImplement;

  async execute(data: ResendCode): Promise<SignInResponseDto> {
    const user = await this.authRepository.getUserById(data.userId);
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const check = await bcrypt.compare(data.refreshToken, user.refreshToken);
    if (!check) {
      throw new ForbiddenException('Access denied');
    }

    const code = faker.string.numeric(6);
    const mailerDto: MailerDTO = {
      from: {
        name: 'Bùi Trần Nhật Thanh',
        address: 'tnt.ccs.system@gmail.com',
      },
      recipients: [{ name: user.name, address: user.email }],
      subject: 'Login confirmation email [Resend]',
      code,
    };
    await this.emailService.sendVerifyEmail(mailerDto);

    const salt = await bcrypt.genSalt();
    const verifiedCode = await bcrypt.hash(code, salt);
    await this.authRepository.updateCode(user.id, verifiedCode);

    const tokens = await this.util.getTemperatureTokens(user.id, user.email);
    const hashToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.authRepository.updateToken(user.id, hashToken);

    return plainToClass(SignInResponseDto, tokens, {
      excludeExtraneousValues: true,
    });
  }
}
