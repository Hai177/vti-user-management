import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', { infer: true }),
      port: this.configService.get<number>('DB_POST', { infer: true }),
      username: this.configService.get<string>('DB_USERNAME', { infer: true }),
      password: this.configService.get<string>('DB_PASSWORD', { infer: true }),
      database: this.configService.get<string>('DB_DATABASE', { infer: true }),
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', { infer: true }),
      dropSchema: false,
      keepConnectionAlive: true,
      ssl: this.configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
    } as TypeOrmModuleOptions;
  }
}
