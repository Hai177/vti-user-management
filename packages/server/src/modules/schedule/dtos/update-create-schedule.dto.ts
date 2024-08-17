import { IsOptional, Validate } from 'class-validator';

import { BooleanFieldOptional, DateField, StringField, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class UpdateOrCreateScheduleDto {
  @StringField()
  title: string;

  @StringField()
  category: string;

  @StringFieldOptional()
  description?: string;

  @DateField()
  startDate: Date;

  @DateField()
  endDate: Date;

  @BooleanFieldOptional({ default: false })
  isAllDay: boolean;

  @StringFieldOptional({ minLength: 0, each: true })
  @IsOptional()
  @Validate(IsExist, ['user', 'id'], {
    message: 'User not exists',
    each: true,
  })
  memberIds?: string[];
}
