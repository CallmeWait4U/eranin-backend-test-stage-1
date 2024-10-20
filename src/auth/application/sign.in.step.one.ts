import { ICommand } from '@nestjs/cqrs';

export class SignInStepOne implements ICommand {
  email: string;
  password: string;

  constructor(data: SignInStepOne) {
    Object.assign(this, data);
  }
}
