import {createAsyncThunk} from '@reduxjs/toolkit';
import {breedApi} from '../../api/breed';
import {surveyApi} from '../../api/survey';

const getBreeds = createAsyncThunk('appData/breeds', async _thunkAPI => {
  const response = await breedApi.fetchDogBreeds();
  return response.data;
});

const getSurveys = createAsyncThunk('appData/surveys', async (_, thunkAPI) => {
  const userId = (thunkAPI.getState() as any).auth.me.data.id;
  const response = await surveyApi.getActiveSurveysByUserId(userId);
  return response.data;
});

export const appDataAction = {getBreeds, getSurveys};
