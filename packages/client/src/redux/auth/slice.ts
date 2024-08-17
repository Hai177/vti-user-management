import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AuthStateType, IUser, UserLoginResponse } from './types';
import { authApi } from './api';

// Define the initial state using that type
const initialState: AuthStateType = {
  refreshToken: localStorage.getItem('rf_token') ?? undefined,
  token: sessionStorage.getItem('ac_token') ?? undefined,
  tokenExpires: parseInt(sessionStorage.getItem('ac_token_expires') ?? '') || undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Pick<UserLoginResponse, 'token' | 'tokenExpires'>>) => {
      const { token, tokenExpires } = action.payload;
      state.token = token;
      state.tokenExpires = tokenExpires;
      sessionStorage.setItem('ac_token', token);
      sessionStorage.setItem('ac_token_expires', tokenExpires.toString());
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('rf_token', action.payload);
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.refreshToken = undefined;
      state.tokenExpires = undefined;
      localStorage.removeItem('rf_token');
      sessionStorage.removeItem('ac_token');
      sessionStorage.removeItem('ac_token_expires');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      Object.assign(state, action.payload);
      sessionStorage.setItem('ac_token', action.payload.token);
      sessionStorage.setItem('ac_token_expires', action.payload.tokenExpires.toString());
      localStorage.setItem('rf_token', action.payload.refreshToken);
    });

    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setToken, logout, setRefreshToken, setUser } = authSlice.actions;

export default authSlice.reducer;
