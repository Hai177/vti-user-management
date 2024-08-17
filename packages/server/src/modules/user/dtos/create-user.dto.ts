import { Validate } from 'class-validator';
import { RoleEnum } from '~/common/enums';

import { EmailFieldOptional, EnumFieldOptional, StringField, StringFieldOptional } from '~/decorators';
import { IsExist, IsNotExist } from '~/validators';

export class CreateUserDto {
  @StringField()
  @Validate(IsNotExist, ['user', 'username'], {
    message: 'User is exist',
  })
  username: string;

  @StringField({ minLength: 6 })
  password: string;

  @EnumFieldOptional(() => RoleEnum, { each: true, default: [RoleEnum.USER] })
  roles: RoleEnum[] = [RoleEnum.USER];

  @EmailFieldOptional()
  email?: string;

  @StringFieldOptional()
  phone?: string;

  @StringFieldOptional()
  firstName?: string;

  @StringFieldOptional()
  lastName?: string;

  @StringFieldOptional()
  @Validate(IsExist, ['team', 'id'], {
    message: 'Team is not exist',
  })
  teamId?: string;

  @StringFieldOptional({ each: true })
  @Validate(IsExist, ['project', 'id'], {
    message: 'Project is not exist',
    each: true,
  })
  projectIds?: string[];
}
