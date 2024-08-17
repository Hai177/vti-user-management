import { IPageOption } from '../../types';

import { IBase } from '~/types';

export type AdminTaskListStateType = {
  tasklists: ITaskList[];
};

export interface ITaskList extends IBase {
  tasks: string;
  projects: string;
  name: string;
}

export type CreateTaskListRequest = {
  name: string;
  description?: string;
};
export type UpdateTaskListRequest = {
  id: string;
} & Partial<CreateTaskListRequest>;

export interface GetTaskListRequest extends IPageOption {}
