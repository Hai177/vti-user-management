import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { RootState } from './store';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).Auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    if (endpoint === 'refresh') {
      const token = (getState() as RootState).Auth.refreshToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const preEndpoint = api.endpoint;
        api.endpoint = 'refresh';
        const refreshResult = await baseQuery('/auth/refresh', api, {
          ...extraOptions,
          headers: {
            authentication: `Bearer ${localStorage.getItem('rf_token')}`,
          },
        });
        if (refreshResult.data) {
          api.dispatch({ type: 'auth/setToken', payload: refreshResult.data });
          // retry the initial query
          api.endpoint = preEndpoint;
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'auth/logout' });
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Auth', 'Project', 'User', 'TaskList', 'Calendar', 'Board', 'Team', 'Task'],
});
