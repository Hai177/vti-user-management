import { api } from '../../baseApi';
import { IPageResponse } from '../../types';
import { CreateTaskListRequest, GetTaskListRequest, ITaskList, UpdateTaskListRequest } from './types';

export const tasklistauthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskLists: builder.query<IPageResponse<ITaskList>, GetTaskListRequest>({
      query(arg) {
        return {
          url: 'tasklist',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'TaskList' as const, id })), { type: 'TaskList', id: 'LIST' }]
          : [{ type: 'TaskList', id: 'LIST' }],
    }),
    createTaskList: builder.mutation<ITaskList, CreateTaskListRequest>({
      query(arg) {
        return {
          url: 'tasklist',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'TaskList', id: 'LIST' }],
    }),
    updateTaskList: builder.mutation<ITaskList, UpdateTaskListRequest>({
      query(arg) {
        return {
          url: `tasklist/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'TaskList', id: p?.id }],
    }),
    deleteTaskList: builder.mutation<ITaskList, string>({
      query(id) {
        return {
          url: `tasklist/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'TaskList', id: p?.id }],
    }),
  }),
});
export const { useCreateTaskListMutation, useGetTaskListsQuery, useUpdateTaskListMutation, useDeleteTaskListMutation } =
  tasklistauthApi;
