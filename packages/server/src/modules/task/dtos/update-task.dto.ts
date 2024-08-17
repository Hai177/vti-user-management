import { IsOptional, Validate } from 'class-validator';
import { StatusEnum } from '~/common/enums';
import { EnumFieldOptional, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class UpdateTaskDto {
  @StringFieldOptional()
  name?: string;

  @EnumFieldOptional(() => StatusEnum)
  status?: StatusEnum;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional()
  @IsOptional()
  @Validate(IsExist, ['task-list', 'id'], {
    message: 'Task list is not exists',
  })
  taskListId?: string;

  @StringFieldOptional({ minLength: 0, each: true })
  @IsOptional()
  @Validate(IsExist, ['user', 'id'], {
    message: 'User not exists',
    each: true,
  })
  memberIds?: string[];
}
