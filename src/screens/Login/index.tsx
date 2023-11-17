import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
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

export default LoginScreen;
