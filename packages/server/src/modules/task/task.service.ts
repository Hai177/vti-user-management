import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ILike, In, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { TaskEntity, TaskListEntity, UserEntity } from '~/database/entities';
import { CreateTaskDto, TaskPageOptionsDto, UpdateTaskDto } from './dtos';

@Injectable()
export class TaskService extends PaginationService<TaskEntity> {
  constructor(
    @InjectRepository(TaskListEntity) private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskListEntity) private readonly taskListRepository: Repository<TaskListEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super(taskRepository);
  }

  getTasks(options: TaskPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { name: ILike(`%${options.q}%`) }),
      },
    });
  }

  async updateTask(id: TaskEntity['id'], payload: UpdateTaskDto) {
    const updateData: DeepPartial<TaskEntity> = { ...payload };

    if (payload.taskListId) {
      const taskList = await this.taskListRepository.findOne({ where: { id: payload.taskListId } });
      updateData.taskList = taskList;
    }

    if (payload.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(payload.memberIds) } });
      updateData.members = users;
    }

    return await this.taskListRepository.save(
      this.taskListRepository.create({
        ...updateData,
        id,
      })
    );
  }

  async softDelete(id: TaskEntity['id']): Promise<void> {
    await this.taskListRepository.softDelete(id);
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const newData: DeepPartial<TaskEntity> = { ...createTaskDto };

    if (createTaskDto.taskListId) {
      const taskList = await this.taskListRepository.findOne({ where: { id: createTaskDto.taskListId } });
      newData.taskList = taskList;
    }

    if (createTaskDto.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(createTaskDto.memberIds) } });
      newData.members = users;
    }

    return this.taskListRepository.save(this.taskListRepository.create({ ...newData }));
  }
}
