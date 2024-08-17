import { IPageOption } from '~/redux/types';
import { IBase } from '~/types';
import { IProject } from '../project';
import { ITeam } from '../team';

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ANONYMOUS = 'ANONYMOUS',
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUser extends IBase {
  username: string;
  name: string;
  email?: string;
  roles: RoleEnum[];
  status: StatusEnum;
  firstName?: string;
  lastName?: string;
  projects?: IProject[];
  team?: ITeam;
}

export type CreateUsersRequest = {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  teamId?: string;
  roles?: RoleEnum[];
  projectIds?: string[];
};

export type UpdateUsersRequest = {
  id: string;
} & Partial<CreateUsersRequest>;

export interface GetUserRequest extends IPageOption {}
