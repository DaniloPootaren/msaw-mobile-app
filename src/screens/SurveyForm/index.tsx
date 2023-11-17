import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const SurveyFormScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SurveyFormScreen</Text>
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

export default SurveyFormScreen;
