/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {BindValue, Survey} from '../../shared/models';
import OwnedDogsImage from '../../assets/images/Owned-Dogs 1.svg';
import StrayDogsImage from '../../assets/images/Stray-Dogs 1.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../shared/enums';
import {RootState} from '../../redux';
import {useSelector} from 'react-redux';
import {ColorPalette} from '../../shared/utils/colors';
import {Button, HStack, ScrollView, Text, VStack} from 'native-base';
import RadioButtonGroup from '../../shared/components/RadioButtonGroup';

const FormSelectionCard = ({
  isOwned,
  onPress,
  active,
}: {
  isOwned: boolean;
  active: boolean;
  onPress: (isOwnDog: boolean) => void;
}) => {
  return (
    <VStack
      style={styles.card}
      borderWidth={active ? 1 : 0}
      borderColor={ColorPalette.primary}>
      <Pressable onPress={() => onPress(isOwned)}>
        {isOwned ? <OwnedDogsImage /> : <StrayDogsImage />}
        <Text style={styles.cardLabel}>
          {isOwned ? 'Own Dog' : 'Stray Dog'}
        </Text>
      </Pressable>
    </VStack>
  );
};

const SurveyScreen = () => {
  const [isOwnDog, setIsOwnDog] = useState<boolean | undefined>(undefined);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | undefined>(
    undefined,
  );
  const surveys = useSelector(
    (state: RootState) => state.appData.surveys?.data,
  );
  const navigation = useNavigation<any>();

  const convertToBindValues = (): BindValue[] | [] => {
    return (
      surveys?.map(survey => ({
        value: JSON.stringify(survey),
        bind: survey.name,
      })) || []
    );
  };

  const isFormValid =
    (selectedSurvey && isOwnDog) || (selectedSurvey && isOwnDog !== undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Survey</Text>
      <VStack style={styles.surveyContainer}>
        <Text style={styles.subTitle}>Open Surveys</Text>
        <ScrollView style={styles.radioContainer}>
          <RadioButtonGroup
            options={convertToBindValues() as BindValue[]}
            onChange={e => setSelectedSurvey(JSON.parse(e))}
          />
        </ScrollView>
      </VStack>
      <HStack space="lg" width="98%" justifyContent="space-between">
        <FormSelectionCard
          isOwned
          onPress={setIsOwnDog}
          active={isOwnDog as boolean}
        />
        <FormSelectionCard
          isOwned={false}
          onPress={setIsOwnDog}
          active={isOwnDog === false}
        />
      </HStack>
      <Button
        onPress={() =>
          navigation.navigate(RouteName.SURVEY_FORM, {
            data: selectedSurvey,
            isOwnDog,
          })
        }
        disabled={!isFormValid}
        style={styles.proceedButton}
        backgroundColor={
          isFormValid ? ColorPalette.primary : ColorPalette.disabledButton
        }>
        <Text color={ColorPalette.white} fontWeight="700">
          Proceed
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: ColorPalette.background,
  },
  surveyContainer: {
    width: '100%',
    backgroundColor: ColorPalette.white,
    paddingHorizontal: 16,
    borderRadius: 8,
    maxHeight: '40%',
    marginBottom: 40,
  },
  radio: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  radioLabel: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: ColorPalette.primary,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: ColorPalette.primary,
    fontWeight: '700',
    marginTop: 10,
  },
  radioContainer: {
    paddingVertical: 9,
    maxHeight: '100%',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.white,
    padding: 20,
    width: '50%',
    borderRadius: 8,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: ColorPalette.primary,
    marginTop: 10,
    alignSelf: 'center',
  },
  proceedButton: {
    marginTop: 40,
    width: '20%',
    alignSelf: 'center',
  },
});

export default SurveyScreen;
