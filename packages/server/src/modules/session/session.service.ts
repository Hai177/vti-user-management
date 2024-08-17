import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { SessionEntity, UserEntity } from 'src/database/entities';
import { EntityCondition, FindOptions } from 'src/common/types';
import { BaseService } from 'src/common/services';

@Injectable()
export class SessionService extends BaseService<SessionEntity> {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>
  ) {
    super(sessionRepository);
  }

  async findMany(options: FindOptions<SessionEntity>): Promise<SessionEntity[]> {
    return this.sessionRepository.find({
      where: options.where,
    });
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: SessionEntity['id'];
    user?: Pick<UserEntity, 'id'>;
    excludeId?: SessionEntity['id'];
  }): Promise<void> {
    const data: EntityCondition<SessionEntity> = { ...criteria };
    if (!criteria.id) {
      if (excludeId) {
        data.id = Not(excludeId);
      } else {
        delete data.id;
      }
    }

    await this.sessionRepository.softDelete(data);
  }
}
