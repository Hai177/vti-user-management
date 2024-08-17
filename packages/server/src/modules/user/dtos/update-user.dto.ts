import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';
import { StringFieldOptional } from '~/decorators';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'username'])) {
  @StringFieldOptional()
  username?: string;
}
