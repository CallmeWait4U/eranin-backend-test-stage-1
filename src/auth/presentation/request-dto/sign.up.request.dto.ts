import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ type: String, example: 'Thanh', description: "Name's user" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'nhatthanh2002chuyen@gmail.com',
    description: "Email's user",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: '123456', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: 'Confirmed Password',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
