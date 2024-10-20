import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerDTO } from 'src/common/mailer.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(mail: MailerDTO) {
    const result = await this.mailerService.sendMail({
      from: mail.from,
      to: mail.recipients,
      subject: mail.subject,
      html: `<p>This is your confirmation code: ${mail.code} </p>
                <p>Please do not reply to this email. </p>`,
    });
    return result;
  }
}

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          service: 'gmail',
          secure: true,
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
        },
        template: {
          dir: join(__dirname, '../mail'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
