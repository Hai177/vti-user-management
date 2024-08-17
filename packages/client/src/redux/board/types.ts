import { IBase, StatusEnum } from '~/types';

export type BoardType = {
  taskLists: ITaskList[];
};

export interface ITaskList extends IBase {
  name: string;
  description?: string;
  status: StatusEnum;
  tasks: ITask[];
  order: number;
}

export interface ITask extends IBase {
  name: string;
  description?: string;
  status: StatusEnum;
  order: number;
}
