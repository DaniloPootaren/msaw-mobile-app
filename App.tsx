import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {ColorPalette} from './src/shared/utils/colors';

function App(): JSX.Element {
  useEffect(() => {
    StatusBar.setBackgroundColor(ColorPalette.primary);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar />
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
