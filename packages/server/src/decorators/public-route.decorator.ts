import { type CustomDecorator, SetMetadata } from '@nestjs/common';

import { PUBLIC_ROUTE_KEY } from '~/constants';

export const PublicRoute = (isPublic = false): CustomDecorator => SetMetadata(PUBLIC_ROUTE_KEY, isPublic);
