import { IsOptional, Validate } from 'class-validator';

import { StatusEnum } from '~/common/enums';
import { EnumField, StringField, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class CreateProjectDto {
  @StringField({ example: 'John Henry' })
  name: string;

  @EnumField(() => StatusEnum)
  status?: StatusEnum = StatusEnum.ACTIVE;

  @StringFieldOptional()
  avatar?: string;

  @StringFieldOptional()
  description?: string;

  @IsOptional()
  @Validate(IsExist, ['user', 'id'], {
    message: 'User not exists',
    each: true,
  })
  memberIds?: string[];
}
