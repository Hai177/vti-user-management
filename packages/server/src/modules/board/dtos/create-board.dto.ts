import { IsOptional, Validate } from 'class-validator';

import { StringField, StringFieldOptional } from '~/decorators';
import { IsExist } from '~/validators';

export class CreateBoardDto {
  @StringField()
  name: string;

  @StringFieldOptional()
  description?: string;

  @StringFieldOptional()
  avatar?: string;

  @StringField()
  @IsOptional()
  @Validate(IsExist, ['project', 'id'], {
    message: 'Project not exists',
  })
  projectId: string;
}
