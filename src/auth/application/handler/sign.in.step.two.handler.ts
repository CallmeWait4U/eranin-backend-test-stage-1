import { ForbiddenException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { SignInResponseDto } from 'src/auth/presentation/response-dto/sign.in.response.dto';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { UtilityImplement } from 'src/libs/util.module';
import { SignInStepTwo } from '../sign.in.step.two';

@CommandHandler(SignInStepTwo)
export class SignInStepTwoHandler
  implements ICommandHandler<SignInStepTwo, SignInResponseDto>
{
  @Inject()
  private readonly authRepository: AuthRepository;
  @Inject()
  private readonly util: UtilityImplement;

  async execute(data: SignInStepTwo): Promise<SignInResponseDto> {
    const user = await this.authRepository.getUserById(data.userId);
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const check = await bcrypt.compare(data.code, user.verifiedCode);
    if (!check) {
      throw new ForbiddenException('Invalid confirmation code');
    }

    const salt = await bcrypt.genSalt();
    const tokens = await this.util.getTokens(user.id, user.email);
    const hashToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.authRepository.updateToken(user.id, hashToken);
    await this.authRepository.updateCode(user.id, null);

    return plainToClass(SignInResponseDto, tokens, {
      excludeExtraneousValues: true,
    });
  }
}
