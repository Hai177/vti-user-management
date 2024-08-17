import { DateFieldOptional } from '~/decorators';

export class GetScheduleByDateDto {
  @DateFieldOptional({ default: new Date() })
  startDate: Date;

  @DateFieldOptional({ default: new Date() })
  endDate: Date;
}
