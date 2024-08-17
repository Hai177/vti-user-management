import { IsOptional, Validate } from 'class-validator';

import { StatusEnum } from '~/common/enums';
import { EnumFieldOptional, StringField, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class CreateTeamDto {
  @StringField({ example: 'John Henry' })
  name: string;

  @EnumFieldOptional(() => StatusEnum, { default: StatusEnum.ACTIVE })
  status?: StatusEnum = StatusEnum.ACTIVE;

  @StringFieldOptional()
  avatar?: string;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional({ minLength: 0, each: true })
  @IsOptional()
  @Validate(IsExist, ['user', 'id'], {
    message: 'User not exists',
    each: true,
  })
  memberIds?: string[];
}
