import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DirectusLoginResponse} from '../../shared/models';
import {AuthState} from '../models';
import {authAction} from '../actions/auth';

const initialState: AuthState = {
  data: {
    access_token: null,
    expires: 0,
    refresh_token: '',
  },
  me: null,
};

export const authSlice: any = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearAuth: state => {
      state.data = initialState.data;
      return state;
    },
    addAuthentication: (
      state,
      action: PayloadAction<{auth: DirectusLoginResponse}>,
    ) => {
      state.data = action.payload.auth.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(authAction.getMeThunk.fulfilled, (state, action) => {
      state.me = action.payload;
    });
  },
});

export const {clearAuth, addAuthentication} = authSlice.actions;

export default authSlice.reducer;
