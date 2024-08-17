import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: configService.get('MAIL_SERVICE'),
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      ignoreTLS: configService.get('MAIL_IGNORE_TLS'),
      secure: configService.get('MAIL_SECURE'),
      requireTLS: configService.get('MAIL_REQUIRE_TLS'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.configService.get('MAIL_DEFAULT_NAME')}" <${this.configService.get('MAIL_DEFAULT_EMAIL')}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
