import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';

import { IsExist } from 'src/validators';
import { lowerCaseTransformer } from '~/transformers';

export class AuthLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsExist, ['user'], {
    message: 'Username is not exist',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
