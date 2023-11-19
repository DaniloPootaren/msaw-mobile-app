import React, {useState} from 'react';
import {BindValue} from '../../models';
import RadioButton from 'react-native-radio-button';
import {HStack, Text} from 'native-base';
import {ColorPalette} from '../../utils/colors';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export enum RadioLayout {
  RIGHT = 'right',
  LEFT = 'left',
}

interface Props {
  options: BindValue[];
  onChange: (val: string) => void;
  layout?: RadioLayout;
}

const RadioButtonGroup = (props: Props) => {
  const {options, onChange, layout} = props;
  const [selectedId, setSelectedId] = useState('');

  const handleRadio = (val: string) => {
    setSelectedId(val);
    onChange(val);
  };

  const _style: any = {
    flexDirection: layout === RadioLayout.LEFT ? 'row-reverse' : 'row',
  };

  return (
    <>
      {options.map(item => {
        return (
          <TouchableOpacity
            onPress={() => handleRadio(item.value)}
            key={item.value}>
            <HStack style={[styles.radioContainer, _style]}>
              <Text color={ColorPalette.paleGreyText}>{item.bind}</Text>
              <RadioButton
                isSelected={item.value === selectedId}
                onPress={() => handleRadio(item.value)}
                size={12}
                innerColor={ColorPalette.primary}
                outerColor={ColorPalette.radioOuter}
              />
            </HStack>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    marginVertical: 5,
  },
});
export default RadioButtonGroup;
