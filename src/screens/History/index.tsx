import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HistoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
