import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', { infer: true }),
          port: configService.get<number>('DB_POST', { infer: true }),
          username: configService.get<string>('DB_USERNAME', { infer: true }),
          password: configService.get<string>('DB_PASSWORD', { infer: true }),
          database: configService.get<string>('DB_DATABASE', { infer: true }),
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', { infer: true }),
          dropSchema: false,
          keepConnectionAlive: true,
          ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
        };
      },
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
      inject: [ConfigService],
    }),
  ],
})
export class DataSourceModule {}
