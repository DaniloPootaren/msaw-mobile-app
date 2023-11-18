import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {NativeBaseProvider} from 'native-base';
import {persistor, store} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import msawTheme from './src/shared/utils/theme';

// Hide Nativebase libray warnings
LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={msawTheme}>
          <App />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
