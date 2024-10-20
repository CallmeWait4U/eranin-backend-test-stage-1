import { Expose } from 'class-transformer';

export class RefreshTokenResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
