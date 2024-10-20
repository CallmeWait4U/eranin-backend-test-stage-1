import { ForbiddenException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { RefreshTokenResponseDto } from 'src/auth/presentation/response-dto/refresh.token.response.dto';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { UtilityImplement } from 'src/libs/util.module';
import { RefreshToken } from '../refresh.token';

@CommandHandler(RefreshToken)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshToken, RefreshTokenResponseDto>
{
  @Inject()
  private readonly authRepository: AuthRepository;
  @Inject()
  private readonly util: UtilityImplement;

  async execute(data: RefreshToken): Promise<RefreshTokenResponseDto> {
    const user = await this.authRepository.getUserById(data.userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const check = await bcrypt.compare(data.refreshToken, user.refreshToken);
    if (!check) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.util.getTokens(user.id, user.email);

    const salt = await bcrypt.genSalt();
    const hashToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.authRepository.updateToken(user.id, hashToken);

    return plainToClass(RefreshTokenResponseDto, tokens, {
      excludeExtraneousValues: true,
    });
  }
}
