import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsSelect, Repository } from 'typeorm';

import { AbstractEntity } from '../entities';
import { EntityCondition, NullableType } from '../types';

export abstract class BaseService<T extends AbstractEntity> {
  constructor(readonly repository: Repository<T>) {}

  public async findById(id: T['id']) {
    return this.repository.createQueryBuilder('entity').where('entity.id = :id', { id }).getOne();
  }

  public async create(dataToCreate: DeepPartial<T>) {
    const data = this.repository.create(dataToCreate);
    await this.repository.save(data);
    return data;
  }

  public async update(id: T['id'], dataToCreate: DeepPartial<T>) {
    const record = await this.findById(id);

    if (!record) {
      throw new NotFoundException();
    }

    this.repository.merge(record, dataToCreate);

    await this.repository.save(dataToCreate);
  }

  public async deletePost(id: T['id']) {
    const queryBuilder = this.repository.createQueryBuilder('post').where('post.id = :id', { id });

    const record = await queryBuilder.getOne();

    if (!record) {
      throw new NotFoundException();
    }

    await this.repository.remove(record);
  }

  public async findOne(options: EntityCondition<T>, select?: FindOptionsSelect<T>): Promise<NullableType<T>> {
    return this.repository.findOne({ where: options, select });
  }
}
