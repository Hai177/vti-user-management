import { Request as ExpressRequest } from 'express';

import { SessionEntity, UserEntity } from './database/entities';

declare module 'express' {
  export interface Request extends ExpressRequest {
    user: UserEntity & {
      sessionId: SessionEntity['id'];
      iat: number;
      exp: number;
    };
    redirectUrl?: string;
  }
}
