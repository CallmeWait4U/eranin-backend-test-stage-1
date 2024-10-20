import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCode {
  @ApiProperty({
    type: String,
    example: '123456',
    description: 'Comfirmation Code',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}
