import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {NativeBaseProvider} from 'native-base';

LogBox.ignoreLogs(['Warning: ...']);

const Main = () => {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
