import { IsOptional, Validate } from 'class-validator';

import { StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class UpdateBoardDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  avatar?: string;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional()
  @IsOptional()
  @Validate(IsExist, ['project', 'id'], {
    message: 'Project not exists',
  })
  projectId?: string;
}
