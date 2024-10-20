import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/libs/database.module';

export class AuthRepository {
  @Inject()
  private readonly prisma: PrismaService;

  public async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async create(
    id: string,
    name: string,
    email: string,
    password: string,
  ) {
    await this.prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
        refreshToken: null,
        verifiedToken: null,
        verifiedCode: null,
      },
    });
  }

  public async updateToken(id: string, token: string | null) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: token },
    });
  }

  public async updateCode(id: string, verifiedCode: string | null) {
    await this.prisma.user.update({
      where: { id },
      data: { verifiedCode },
    });
  }
}
