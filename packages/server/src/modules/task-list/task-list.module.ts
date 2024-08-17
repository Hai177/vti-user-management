import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { BoardEntity, TaskListEntity } from '~/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TaskListEntity, BoardEntity])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
