import { IUser } from '~/redux/auth/types';
import { IPageOption } from '~/redux/types';
import { IBase, StatusEnum } from '~/types';
import { IProject } from '../project';

export type CreateBoardRequest = {
  name: string;
  description?: string;
  memberIds?: string[];
  projectId?: string;
};

export type UpdateBoardRequest = {
  id: string;
} & Partial<CreateBoardRequest>;

export interface IBoard extends IBase {
  name: string;
  description?: string;
  status: StatusEnum;
  project?: IProject;
  members: IUser[];
}

export interface GetBoardRequest extends IPageOption {}
