import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity, ProjectPermissionEntity, UserEntity } from '~/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectPermissionEntity, UserEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
