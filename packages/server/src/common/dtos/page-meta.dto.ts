import { PageOptionsDto } from './page-options.dto';
import { BooleanField, NumberField } from '~/decorators';

export class PageMetaDto {
  @NumberField()
  readonly page: number;

  @NumberField()
  readonly take: number;

  @NumberField()
  readonly itemCount: number;

  @NumberField()
  readonly pageCount: number;

  @BooleanField()
  readonly hasPreviousPage: boolean;

  @BooleanField()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: { pageOptionsDto: PageOptionsDto; itemCount: number }) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
