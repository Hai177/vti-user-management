import { ROLE_OPTIONS } from '~/appConstants';
import { IProject } from '~/redux/admin/project';
import { ITeam } from '~/redux/admin/team';
import { RoleEnum } from '~/redux/admin/user';
import { IUser } from '~/redux/auth/types';
import { Option } from '~/types';

export const convertUsersToOptions = (users: IUser[] = []): Option[] =>
  users.map((user) => ({ label: user.username, value: user.id }));

export const convertProjectToOption = (project?: IProject): Option | undefined => {
  if (!project) {
    return undefined;
  }

  return { label: project.name, value: project.id };
};

export const convertTeamToOption = (team?: ITeam): Option | undefined => {
  if (!team) {
    return undefined;
  }

  return { label: team.name, value: team.id };
};

export const convertProjectsToOptions = (projects: IProject[] = []): Option[] =>
  projects.map((project) => ({ label: project.name, value: project.id }));

export const convertTeamsToOptions = (teams: ITeam[] = []): Option[] =>
  teams.map((team) => ({ label: team.name, value: team.id }));

export const convertRolesToOptions = (roles: RoleEnum[] = []) =>
  ROLE_OPTIONS.filter((role) => roles.includes(role.value));

export const optionToValue = <T extends string>(option?: Option<T>) => option?.value;

export const optionsToValues = <T extends string>(options: Option<T>[] = []) =>
  options.map((option) => optionToValue<T>(option)).filter(Boolean) as T[];
