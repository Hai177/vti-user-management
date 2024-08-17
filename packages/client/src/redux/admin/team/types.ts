import { IBase } from '~/types';
import { IUser } from '../user';
import { IPageOption } from '~/redux/types';

export type AdminTeamStateType = {
  teams: ITeam[];
};

export interface ITeam extends IBase {
  name: string;
  description?: string;
  members?: IUser[];
}
export type CreateTeamRequest = {
  name: string;
  description?: string;
  memberIds?: string[];
};

export type UpdateTeamRequest = {
  id: string;
} & Partial<CreateTeamRequest>;

export interface GetTeamRequest extends IPageOption {}
