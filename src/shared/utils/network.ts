import axios, {Axios, AxiosError} from 'axios';
import {Alert} from 'react-native';

import join from 'url-join';
import {RootState, store} from '../../redux';
import {BASE_URL} from '../constants/url';
import {navigationRef} from './navigation';
import {RouteName} from '../enums';
import {clearAuth} from '../../redux/slices/auth';

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

export const httpClient = (): Axios => {
  let instance = axios.create();
  const token = (store.getState() as RootState).auth.data.access_token;

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in to continue.',
        );
      }

      if (error.response?.status === 403) {
        Alert.alert('Permission Denied', 'Please contact your administrator');
      }
      store.dispatch(clearAuth());
      navigationRef.current?.navigate(RouteName.LOGIN, {shouldGoBack: true});
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(
    function (config) {
      if (token) {
        config!.headers!.Authorization = `Bearer ${token}`;
      }

      if (!isAbsoluteURLRegex.test(config.url as string)) {
        config.url = join(BASE_URL, config.url as string);
      }

      return config;
    },
    function (error) {
      Alert.alert('Error request', JSON.stringify(error));
      return Promise.reject(error);
    },
  );
  return instance;
};
