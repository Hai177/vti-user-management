import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamEntity, UserEntity } from '~/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, UserEntity])],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
