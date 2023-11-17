import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ColorPalette} from '../../utils/colors';

const {width} = Dimensions.get('window');

interface Props {
  progress: number;
}

const ProgressBar = (props: Props) => {
  const {progress} = props;
  return (
    <View style={styles.container}>
      <View style={[styles.progress, {width: `${progress}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: ColorPalette.white,
    width,
  },
  progress: {
    flex: 1,
    backgroundColor: ColorPalette.primary,
  },
});

export default ProgressBar;
