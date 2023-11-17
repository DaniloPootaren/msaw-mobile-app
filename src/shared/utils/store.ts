import {AnyAction} from 'redux';
import {ThunkAction} from '@reduxjs/toolkit';
import {store} from '../../redux';
import {Alert} from 'react-native';

export const dispatchMultipleActions = (
  actions: (AnyAction | ThunkAction<any, any, any, AnyAction>)[],
  callback?: () => void,
  onError?: () => void,
): void => {
  const dispatchFunc = async (action: any) => {
    if (typeof action === 'function') {
      try {
        return await action(store.dispatch, store.getState, null);
      } catch (error) {
        Alert.alert('Server Busy', 'Error while fetching app data.');
      }
    }
    return store.dispatch(action);
  };
  const dispatchedActions = actions.map(dispatchFunc);
  Promise.all(dispatchedActions).then((res: any) => {
    if (res.some((item: any) => 'error' in item)) {
      if (onError) {
        onError();
        return;
      }
    } else {
      actions.forEach(() => {
        if (callback) {
          callback();
        }
      });
    }
  });
};
