import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ColorPalette} from './src/shared/utils/colors';
import Routing from './src/routes';

function App(): JSX.Element {
  useEffect(() => {
    StatusBar.setBackgroundColor(ColorPalette.primary);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar />
      <Routing />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: ColorPalette.background,
    flex: 1,
  },
});

export default App;
