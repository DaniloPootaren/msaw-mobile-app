import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../../api/auth';

const getMeThunk = createAsyncThunk(
  'auth/me',
  async (accessToken: string, _thunkAPI) => {
    const response = await authApi.getMe(accessToken);
    return response.data;
  },
);

export const authAction = {getMeThunk};
