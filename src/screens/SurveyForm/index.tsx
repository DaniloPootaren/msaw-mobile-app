import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from '../../shared/components/Panel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Survey} from '../../shared/models';
import {RouteProp, useRoute} from '@react-navigation/native';
import StrayDog from './StrayDog';
import {Text, View} from 'native-base';
import {ColorPalette} from '../../shared/utils/colors';

interface ParamsProps {
  data: Survey;
  isOwnDog: boolean;
}

const SurveyForm = () => {
  const route = useRoute<RouteProp<{params: ParamsProps}>>();
  const {data, isOwnDog} = route.params;

  // const renderOwnerInfo = () => {
  //   return (
  //     <>
  //       <Text style={styles.formTitle}>Owner Info</Text>
  //       <Panel title="Gender">
  //         <RadioGroup justifyContent="flex-start" flexDirection="row">
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel} mr={10}>
  //               Male
  //             </RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>Female</RadioLabel>
  //           </Radio>
  //         </RadioGroup>
  //       </Panel>
  //       <Panel title="Monthly Income status of Earner:">
  //         <RadioGroup
  //           justifyContent="flex-start"
  //           flexDirection="row"
  //           flexWrap="wrap">
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel} mr={10}>
  //               ≤ 15000 - 25000
  //             </RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>26-46</RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>25000 - 45000</RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>45000 - 75000</RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>≥ 750000</RadioLabel>
  //           </Radio>
  //         </RadioGroup>
  //       </Panel>
  //       <Panel title="Age group:">
  //         <RadioGroup justifyContent="flex-start" flexDirection="row">
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel} mr={10}>
  //               18-25
  //             </RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>26-46</RadioLabel>
  //           </Radio>
  //           <Radio
  //             value=""
  //             size="sm"
  //             isInvalid={false}
  //             isDisabled={false}
  //             mr={10}>
  //             <RadioIndicator
  //               mr="$2"
  //               borderColor={ColorPalette.paleborder}
  //               padding={7}
  //               borderWidth={0.8}>
  //               <RadioIcon as={CircleIcon} paddingStart="$1.5" />
  //             </RadioIndicator>
  //             <RadioLabel style={styles.radioLabel}>41-60</RadioLabel>
  //           </Radio>
  //         </RadioGroup>
  //       </Panel>
  //     </>
  //   );
  // };

  return (
    <KeyboardAwareScrollView enableAutomaticScroll>
      <View style={styles.container}>{<StrayDog survey={data} />}</View>
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
