import { IsOptional, Validate } from 'class-validator';
import { StatusEnum } from '~/common/enums';
import { EnumFieldOptional, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class UpdateProjectDto {
  @StringFieldOptional()
  name?: string;

  @EnumFieldOptional(() => StatusEnum)
  status?: StatusEnum;

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
