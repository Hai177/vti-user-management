import { IUser } from '../admin/user';
import { api } from '../baseApi';
import { UserLoginRequest, UserLoginResponse } from './types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserLoginResponse, UserLoginRequest>({
      query(arg) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: { ...arg },
        };
      },
      invalidatesTags: ['Auth'],
    }),
    getMe: builder.query<IUser, void>({
      query() {
        return {
          url: 'auth/me',
          method: 'GET',
          credentials: 'include',
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          method: 'POST',
        };
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
