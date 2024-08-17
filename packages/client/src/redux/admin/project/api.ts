import { IPageResponse } from '~/redux/types';
import { api } from '../../baseApi';
import { CreateProjectRequest, GetProjectRequest, IProject, UpdateProjectRequest } from './types';

export const projectAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IPageResponse<IProject>|void, GetProjectRequest|void>({
      query(arg) {
        return {
          url: 'project',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Project' as const, id })), { type: 'Project', id: 'LIST' }]
          : [{ type: 'Project', id: 'LIST' }],
    }),
    createProject: builder.mutation<IProject, CreateProjectRequest>({
      query(arg) {
        return {
          url: 'project',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    updateProject: builder.mutation<IProject, UpdateProjectRequest>({
      query(arg) {
        return {
          url: `project/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'Project', id: p?.id }],
    }),
    deleteProject: builder.mutation<IProject, string>({
      query(id) {
        return {
          url: `project/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'Project', id: p?.id }],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useLazyGetProjectsQuery,
} = projectAdminApi;
