import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { v4 as uuidv4 } from 'uuid';
import { SignUp } from '../sign.up';

@CommandHandler(SignUp)
export class SignUpHandler implements ICommandHandler<SignUp, string> {
  @Inject()
  private readonly authRepository: AuthRepository;

  async execute(data: SignUp): Promise<string> {
    const existedUser = await this.authRepository.getUserByEmail(data.email);
    if (existedUser) {
      throw new HttpException('Email existed', HttpStatus.BAD_REQUEST);
    }
    if (data.password !== data.confirmPassword) {
      throw new HttpException('Confirm password wrong', HttpStatus.BAD_REQUEST);
    }
    const id = uuidv4().toString();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    await this.authRepository.create(id, data.name, data.email, hashPassword);
    return 'Sign up successfully';
  }
}
