import { IBase } from '~/types';
import { IUser } from '../user';
import { IPageOption } from '~/redux/types';

export type AdminTaskStateType = {
  tasks: ITask[];
};

export interface ITask extends IBase {
  name: string;
  description?: string;
  memberOptions?: IUser[];
}
export type CreateTaskRequest = {
  name: string;
  description?: string;
  memberIds?: string[];
};

export type UpdateTaskRequest = {
  id: string;
  memberIds?: string[];
} & Partial<CreateTaskRequest>;

export interface GetTaskRequest extends IPageOption {}
