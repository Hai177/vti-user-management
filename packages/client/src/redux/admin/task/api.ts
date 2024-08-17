import { api } from '~/redux/baseApi';
import { CreateTaskRequest, GetTaskRequest, ITask, UpdateTaskRequest } from './types';
import { IPageResponse } from '~/redux/types';

export const taskAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<IPageResponse<ITask>, GetTaskRequest>({
      query(arg) {
        return {
          url: 'task',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) => {
        return result
          ? [...result.data.map(({ id }) => ({ type: 'Task' as const, id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }];
      },
    }),
    createTask: builder.mutation<ITask, CreateTaskRequest>({
      query(arg) {
        return {
          url: 'task',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation<ITask, UpdateTaskRequest>({
      query(arg) {
        return {
          url: `task/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'Task', id: p?.id }],
    }),
    deleteTask: builder.mutation<ITask, string>({
      query(id) {
        return {
          url: `task/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'Task', id: p?.id }],
    }),
  }),
});
export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskAdminApi;
