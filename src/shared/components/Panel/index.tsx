import {HStack, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../utils/colors';
import {AlertCircle} from 'lucide-react-native';

interface Props {
  title: string;
  number: number;
  hasError?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

const Panel = (props: Props) => {
  const {title, children, number, hasError, errorMessage} = props;
  return (
    <View
      style={[
        styles.container,
        {borderColor: hasError ? ColorPalette.red : ''},
        {borderWidth: hasError ? 1 : 0},
      ]}>
      <HStack>
        <Text style={styles.title}>
          <Text
            color={ColorPalette.primary}
            fontWeight="bold"
            fontSize={14}
            textAlign="center">
            {number}.{` `}
          </Text>
          {title}
        </Text>
      </HStack>
      <View style={styles.childrenContainer}>{children}</View>
      {hasError && (
        <HStack mt={3}>
          <AlertCircle color={ColorPalette.red} />
          <Text ml={4} style={styles.errorMessage}>
            {errorMessage}
          </Text>
        </HStack>
      )}
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
  errorMessage: {
    color: ColorPalette.red,
    fontWeight: '700',
  },
});

export default Panel;
