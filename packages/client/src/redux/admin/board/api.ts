import { api } from '../../baseApi';
import { GetBoardRequest, IBoard, CreateBoardRequest, UpdateBoardRequest } from './types';
import { IPageResponse } from '~/redux/types';

export const boardAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<IPageResponse<IBoard>, GetBoardRequest>({
      query(arg) {
        return {
          url: 'board',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Board' as const, id })), { type: 'Board', id: 'LIST' }]
          : [{ type: 'Board', id: 'LIST' }],
    }),
    createBoard: builder.mutation<IBoard, CreateBoardRequest>({
      query(arg) {
        return {
          url: 'board',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<IBoard, UpdateBoardRequest>({
      query(arg) {
        return {
          url: `board/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'Board', id: p?.id }],
    }),
    deleteBoard: builder.mutation<IBoard, string>({
      query(id) {
        return {
          url: `board/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'Board', id: p?.id }],
    }),
  }),
});

export const { useCreateBoardMutation, useGetBoardsQuery, useUpdateBoardMutation, useDeleteBoardMutation } =
  boardAdminApi;
