import { Module } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForgotEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotEntity])],
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}
