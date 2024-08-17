import { RoleEnum } from '~/redux/admin/user';
import { StatusEnum } from '~/types';

export const PAGE_TITLE_SUFFIX = '| Management';

export const ROLE_OPTIONS = [
  {
    label: 'ADMIN',
    value: RoleEnum.ADMIN,
  },
  {
    label: 'USER',
    value: RoleEnum.USER,
  },
  {
    label: 'CUSTOMER',
    value: RoleEnum.CUSTOMER,
  },
  {
    label: 'ANONYMOUS',
    value: RoleEnum.ANONYMOUS,
  },
];

export const STATUS_OPTIONS = [
  {
    label: 'ACTIVE',
    value: StatusEnum.ACTIVE,
  },
  {
    label: 'INACTIVE',
    value: StatusEnum.INACTIVE,
  },
];
