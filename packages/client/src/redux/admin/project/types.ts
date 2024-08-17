import { IPageOption } from '~/redux/types';
import { IBase } from '~/types';
import { IUser } from '../user';

export type AdminProjectStateType = {
  projects: IProject[];
};

export interface IProject extends IBase {
  name: string;
  description?: string;
  members: IUser[];
}

export type CreateProjectRequest = {
  name: string;
  description?: string;
  memberIds?: string[];
};

export type UpdateProjectRequest = {
  id: string;
  memberIds?: string[];
} & Partial<CreateProjectRequest>;

export interface GetProjectRequest extends IPageOption {}
