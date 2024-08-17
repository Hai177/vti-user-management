import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { BaseService } from 'src/common/services';
import { ForgotEntity } from 'src/database/entities';

@Injectable()
export class ForgotService extends BaseService<ForgotEntity> {
  constructor(
    @InjectRepository(ForgotEntity)
    private readonly forgotRepository: Repository<ForgotEntity>
  ) {
    super(forgotRepository);
  }

  async create(data: DeepPartial<ForgotEntity>): Promise<ForgotEntity> {
    return this.create(data);
  }

  async softDelete(id: ForgotEntity['id']): Promise<void> {
    await this.forgotRepository.softDelete(id);
  }
}
