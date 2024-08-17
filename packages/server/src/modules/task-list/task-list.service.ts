import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ILike, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { BoardEntity, TaskListEntity } from '~/database/entities';
import { CreateTaskListDto, TaskListPageOptionsDto, UpdateTaskListDto } from './dtos';

@Injectable()
export class TaskListService extends PaginationService<TaskListEntity> {
  constructor(
    @InjectRepository(TaskListEntity) private readonly taskListRepository: Repository<TaskListEntity>,
    @InjectRepository(BoardEntity) private readonly boardRepository: Repository<BoardEntity>
  ) {
    super(taskListRepository);
  }

  getTaskList(options: TaskListPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { name: ILike(`%${options.q}%`) }),
      },
    });
  }

  async updateTaskList(id: TaskListEntity['id'], payload: UpdateTaskListDto) {
    const updateData: DeepPartial<TaskListEntity> = { ...payload };

    if (payload.boardId) {
      const board = await this.boardRepository.findOne({ where: { id: payload.boardId } });
      updateData.board = board;
    }

    return await this.taskListRepository.save(
      this.taskListRepository.create({
        ...updateData,
        id,
      })
    );
  }

  async softDelete(id: TaskListEntity['id']): Promise<void> {
    await this.taskListRepository.softDelete(id);
  }

  async createTaskList(createBoardDto: CreateTaskListDto) {
    const newData: DeepPartial<TaskListEntity> = { ...createBoardDto };

    if (createBoardDto.boardId) {
      const board = await this.boardRepository.findOne({ where: { id: createBoardDto.boardId } });
      newData.board = board;
    }
    return this.taskListRepository.save(this.taskListRepository.create({ ...newData }));
  }
}
