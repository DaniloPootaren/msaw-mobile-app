import {createSlice} from '@reduxjs/toolkit';
import {AppDataState} from '../models';
import {appDataAction} from '../actions/appData';

const initialState: AppDataState = {
  breeds: null,
  surveys: null,
};

export const authSlice: any = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    clearAppData: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(appDataAction.getBreeds.fulfilled, (state, action) => {
      state.breeds = action.payload;
    });
    builder.addCase(appDataAction.getSurveys.fulfilled, (state, action) => {
      state.surveys = action.payload;
    });
  },
});

export const {clearAppData} = authSlice.actions;

export default authSlice.reducer;
