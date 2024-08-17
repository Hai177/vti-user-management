import { SessionEntity, UserEntity } from 'src/database/entities';

export type JwtPayloadType = Pick<UserEntity, 'id' | 'roles'> & {
  sessionId: SessionEntity['id'];
  iat: number;
  exp: number;
};
