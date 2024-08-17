import { IPageResponse } from '~/redux/types';
import { api } from '../../baseApi';
import { GetUserRequest, IUser, CreateUsersRequest, UpdateUsersRequest } from './types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IPageResponse<IUser>, GetUserRequest>({
      query(arg) {
        return {
          url: 'user',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),
    createUser: builder.mutation<IUser, CreateUsersRequest>({
      query(arg) {
        return {
          url: 'user',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<IUser, UpdateUsersRequest>({
      query(arg) {
        return {
          url: `user/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'User', id: p?.id }],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query(id) {
        return {
          url: `User/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'User', id: p?.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
