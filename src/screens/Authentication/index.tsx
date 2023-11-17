import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const AuthenticationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AuthenticationScreen</Text>
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

export default AuthenticationScreen;
