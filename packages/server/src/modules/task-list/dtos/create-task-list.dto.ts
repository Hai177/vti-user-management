import { IsOptional, Validate } from 'class-validator';

import { StringField, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class CreateTaskListDto {
  @StringField()
  name: string;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional()
  @IsOptional()
  @Validate(IsExist, ['board', 'id'], {
    message: 'Board not exists',
  })
  boardId?: string;

  @StringFieldOptional({ minLength: 0, each: true })
  @IsOptional()
  @Validate(IsExist, ['task', 'id'], {
    message: 'Task not exists',
    each: true,
  })
  taskIds?: string[];
}
