import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/database/entities';

export class LoginResponseType {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenExpires: number;

  @ApiProperty()
  user: UserEntity;
}
