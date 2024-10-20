import { ICommand } from '@nestjs/cqrs';

export class ResendCode implements ICommand {
  userId: string;
  refreshToken: string;

  constructor(data: ResendCode) {
    Object.assign(this, data);
  }
}
