import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Survey} from '../../shared/models';
import {RouteProp, useRoute} from '@react-navigation/native';
import StrayDog from './StrayDog';
import {View} from 'native-base';
import {ColorPalette} from '../../shared/utils/colors';
import OwnedDog from './OwnedDog';

interface ParamsProps {
  data: Survey;
  isOwnDog: boolean;
}

const SurveyForm = () => {
  const route = useRoute<RouteProp<{params: ParamsProps}>>();
  const {data, isOwnDog} = route.params;

  return (
    <KeyboardAwareScrollView enableAutomaticScroll>
      <View style={styles.container}>
        {isOwnDog ? <OwnedDog survey={data} /> : <StrayDog survey={data} />}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.background,
    flex: 1,
    padding: 24,
  },
  radioLabel: {
    fontSize: 14,
  },
  formTitle: {
    fontSize: 20,
    color: ColorPalette.primary,
    fontWeight: '700',
    marginVertical: 15,
  },
});

export default SurveyForm;
