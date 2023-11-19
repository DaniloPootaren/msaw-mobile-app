import React, {useState} from 'react';
import {BindValue} from '../../models';
import RadioButton from 'react-native-radio-button';
import {HStack, Text, VStack, View} from 'native-base';
import {ColorPalette} from '../../utils/colors';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export enum RadioLayout {
  RIGHT = 'right',
  LEFT = 'left',
}

interface Props {
  options: BindValue[] | string[];
  onChange: (val: string) => void;
  layout?: RadioLayout;
  value?: any;
  horizontal?: boolean;
}

const RadioButtonGroup = (props: Props) => {
  const {options, onChange, layout, value, horizontal} = props;
  const [selectedItem, setSelectedItem] = useState('');

  const handleRadio = (val: string) => {
    setSelectedItem(val);
    onChange(val);
  };

  const _style: any = {
    flexDirection: layout === RadioLayout.LEFT ? 'row-reverse' : 'row',
  };

  const renderRadio = () => (
    <>
      {options.map((item: BindValue | string) => {
        return (
          <TouchableOpacity
            onPress={() => handleRadio((item as BindValue)?.value || item)}
            key={(item as BindValue).value || item}>
            <HStack space={1} style={[styles.radioContainer, _style]}>
              <Text color={ColorPalette.paleGreyText}>
                {(item as BindValue).bind || (item as string)}
              </Text>
              <RadioButton
                isSelected={
                  value === (item as BindValue)?.bind ||
                  (item as BindValue)?.value === selectedItem ||
                  item === selectedItem
                }
                onPress={() => handleRadio((item as BindValue)?.value || item)}
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

  return horizontal ? (
    <HStack space={5} alignItems="center">
      {renderRadio()}
    </HStack>
  ) : (
    <View>{renderRadio()}</View>
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
