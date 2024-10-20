import { ICommand } from '@nestjs/cqrs';

export class SignUp implements ICommand {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(data: SignUp) {
    Object.assign(this, data);
  }
}
