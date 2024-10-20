import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    type: String,
    example: 'nhatthanh2002chuyen@gmail.com',
    description: "Email's user",
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: '123456', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
