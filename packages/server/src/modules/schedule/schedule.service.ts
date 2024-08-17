import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeepPartial, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { ScheduleEntity, UserEntity } from '~/database/entities';
import { GetScheduleByDateDto, SchedulePageOptionsDto, UpdateOrCreateScheduleDto } from './dtos';

@Injectable()
export class ScheduleService extends PaginationService<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity) private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {
    super(scheduleRepository);
  }

  getSchedules(options: SchedulePageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { title: ILike(`%${options.q}%`) }),
      },
    });
  }

  getScheduleByDate({ startDate, endDate }: GetScheduleByDateDto) {
    return this.scheduleRepository.find({
      where: [
        {
          startDate: Between(startDate, endDate),
        },
        {
          endDate: Between(startDate, endDate),
        },
        {
          startDate: LessThanOrEqual(startDate),
          endDate: MoreThanOrEqual(endDate),
        },
      ],
    });
  }

  async createSchedule(payload: UpdateOrCreateScheduleDto, user: UserEntity) {
    const newData: DeepPartial<ScheduleEntity> = { ...payload, createdBy: user };

    if (payload.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(payload.memberIds) } });
      newData.members = users;
    }

    return this.scheduleRepository.save(this.scheduleRepository.create({ ...newData }));
  }

  async updateSchedule(id: ScheduleEntity['id'], payload: UpdateOrCreateScheduleDto, user: UserEntity) {
    const schedule = await this.scheduleRepository.findOne({ where: { id }, relations: ['createdBy'] });

    if (!schedule) {
      throw new NotFoundException('Not found schedule');
    }

    if (schedule.createdBy.id !== user.id) {
      throw new MethodNotAllowedException();
    }

    const newData: DeepPartial<ScheduleEntity> = { ...payload };

    if (payload.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(payload.memberIds) } });
      newData.members = users;
    }

    return this.scheduleRepository.save(this.scheduleRepository.create({ ...newData, id }));
  }

  async softDelete(id: ScheduleEntity['id']): Promise<void> {
    await this.scheduleRepository.softDelete(id);
  }
}
