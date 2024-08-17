import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity, TaskListEntity, UserEntity } from '~/database/entities';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskListEntity, UserEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
