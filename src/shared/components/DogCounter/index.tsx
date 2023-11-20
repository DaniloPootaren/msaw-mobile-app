import {HStack, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../utils/colors';

import IncrementIcon from '../../../assets/icons/increment.svg';
import DecrementIcon from '../../../assets/icons/decrement.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  onChange: (counter: number) => void;
}

const DogCounter = (props: Props) => {
  const {onChange} = props;
  const [maleCounter, setMaleCounter] = useState(0);
  const [femaleCounter, setFemaleCounter] = useState(0);

  const handleMaleIncrement = () => {
    if (maleCounter < 100) {
      setMaleCounter(maleCounter + 1);
    }
  };

  const handleMaleDecrement = () => {
    if (maleCounter > 0) {
      setMaleCounter(maleCounter - 1);
    }
  };

  const handleFemaleIncrement = () => {
    if (femaleCounter < 100) {
      setFemaleCounter(femaleCounter + 1);
    }
  };

  const handleFemaleDecrement = () => {
    if (femaleCounter > 0) {
      setFemaleCounter(femaleCounter - 1);
    }
  };

  useEffect(() => {
    onChange(maleCounter + femaleCounter);
  }, [maleCounter, femaleCounter, onChange]);

  return (
    <HStack>
      <View width="30%" flexDirection="row" alignItems="center">
        <Text mr={3}>Male:</Text>
        <HStack style={styles.container}>
          <TouchableOpacity onPress={handleMaleIncrement}>
            <IncrementIcon />
          </TouchableOpacity>
          <Text>{maleCounter}</Text>
          <TouchableOpacity onPress={handleMaleDecrement}>
            <DecrementIcon />
          </TouchableOpacity>
        </HStack>
      </View>
      <View width="30%" flexDirection="row" alignItems="center">
        <Text mr={3}>Female:</Text>
        <HStack style={styles.container}>
          <TouchableOpacity onPress={handleFemaleIncrement}>
            <IncrementIcon />
          </TouchableOpacity>
          <Text>{femaleCounter}</Text>
          <TouchableOpacity onPress={handleFemaleDecrement}>
            <DecrementIcon />
          </TouchableOpacity>
        </HStack>
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.background,
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 80,
  },
});

export default DogCounter;
