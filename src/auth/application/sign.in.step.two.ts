import { ICommand } from '@nestjs/cqrs';

export class SignInStepTwo implements ICommand {
  userId: string;
  code: string;

  constructor(data: SignInStepTwo) {
    Object.assign(this, data);
  }
}
