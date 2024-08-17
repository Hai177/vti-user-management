import { SessionEntity } from 'src/database/entities';

export type JwtRefreshPayloadType = {
  sessionId: SessionEntity['id'];
  iat: number;
  exp: number;
};
