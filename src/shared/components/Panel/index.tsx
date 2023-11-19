import {HStack, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../utils/colors';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Panel = (props: Props) => {
  const {title, children} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorPalette.white,
    minHeight: 100,
    borderRadius: 8,
    padding: 16,
    marginVertical: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: ColorPalette.boldText,
    marginBottom: 8,
  },
  childrenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default Panel;
