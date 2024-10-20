import { ICommand } from '@nestjs/cqrs';

export class RefreshToken implements ICommand {
  userId: string;
  refreshToken: string;

  constructor(data: RefreshToken) {
    Object.assign(this, data);
  }
}
