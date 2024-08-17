import { IsOptional, Validate } from 'class-validator';
import { StatusEnum } from '~/common/enums';
import { EnumFieldOptional, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class UpdateTaskListDto {
  @StringFieldOptional()
  name?: string;

  @EnumFieldOptional(() => StatusEnum)
  status?: StatusEnum;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional()
  @IsOptional()
  @Validate(IsExist, ['board', 'id'], {
    message: 'Board not exists',
  })
  boardId?: string;
}
