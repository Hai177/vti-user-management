import { IUser } from '../admin/user';

export type AuthStateType = Partial<UserLoginResponse>;

export type UserLoginResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: IUser;
};

export type UserLoginRequest = {
  username: string;
  password: string;
};

export { IUser };
