import { api } from '../baseApi';
import { ICalendar, GetCalendarByTimeRequest, CreateOrUpdateCalendarRequest } from './types';

export const calendarAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarsByTime: builder.query<ICalendar[], GetCalendarByTimeRequest>({
      query(arg) {
        return {
          url: 'schedule/by-date',
          method: 'GET',
          credentials: 'include',
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Calendar' as const, id })), { type: 'Calendar', id: 'LIST' }]
          : [{ type: 'Project', id: 'LIST' }],
    }),
    createCalendar: builder.mutation<ICalendar, CreateOrUpdateCalendarRequest>({
      query(arg) {
        return {
          url: 'schedule',
          method: 'POST',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: [{ type: 'Calendar', id: 'LIST' }],
    }),
    updateCalendar: builder.mutation<ICalendar, CreateOrUpdateCalendarRequest>({
      query(arg) {
        return {
          url: `schedule/${arg.id}`,
          method: 'PUT',
          credentials: 'include',
          body: { ...arg },
        };
      },
      invalidatesTags: (p) => [{ type: 'Calendar', id: p?.id }],
    }),
    deleteCalendar: builder.mutation<ICalendar, string>({
      query(id) {
        return {
          url: `schedule/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (p) => [{ type: 'Project', id: p?.id }],
    }),
  }),
});

export const {
  useGetCalendarsByTimeQuery,
  useCreateCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
} = calendarAdminApi;
