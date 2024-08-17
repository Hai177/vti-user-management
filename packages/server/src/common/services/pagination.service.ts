import { FindManyOptions, Repository } from 'typeorm';
import { AbstractEntity } from '../entities';
import { BaseService } from './base.service';
import { PageDto, PageMetaDto, PageOptionsDto } from '../dtos';

export abstract class PaginationService<T extends AbstractEntity> extends BaseService<T> {
  constructor(readonly repository: Repository<T>) {
    super(repository);
  }

  async paginate(options?: PageOptionsDto, query?: FindManyOptions<T>) {
    const [records, itemCount] = await this.repository.findAndCount({
      skip: options.skip,
      take: options.take,
      ...query,
    });
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: options });
    return new PageDto(records, pageMetaDto);
  }
}
