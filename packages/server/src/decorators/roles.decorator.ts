import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '~/common/enums';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
