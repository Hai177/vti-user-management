import { api } from '~/redux/baseApi';
import { CreateTeamRequest, GetTeamRequest, ITeam, UpdateTeamRequest } from './types';
import { IPageResponse } from '~/redux/types';

export const teamAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<IPageResponse<ITeam>, GetTeamRequest>({
      query(arg) {
        return {
          url: 'team',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) => {
        return result
          ? [...result.data.map(({ id }) => ({ type: 'Team' as const, id })), { type: 'Team', id: 'LIST' }]
          : [{ type: 'Team', id: 'LIST' }];
      },
    }),
    createTeam: builder.mutation<ITeam, CreateTeamRequest>({
      query(arg) {
        return {
          url: 'team',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'Team', id: 'LIST' }],
    }),
    updateTeam: builder.mutation<ITeam, UpdateTeamRequest>({
      query(arg) {
        return {
          url: `team/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'Team', id: p?.id }],
    }),
    deleteTeam: builder.mutation<ITeam, string>({
      query(id) {
        return {
          url: `team/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'Team', id: p?.id }],
    }),
  }),
});
export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useLazyGetTeamsQuery,
} = teamAdminApi;
