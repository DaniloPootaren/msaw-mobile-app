import React, {useEffect, useState} from 'react';
import Panel from '../../../shared/components/Panel';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {Alert, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Survey, SurveyResult} from '../../../shared/models';
import {CoordinateType, WeatherCondition, YES_NO} from '../../../shared/enums';
import {schema} from '../helpers/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {convertDateString} from '../../../shared/utils/date';
import Calendar from '../../../assets/icons/calendar.svg';
import Geolocation from '@react-native-community/geolocation';
import {Button, HStack, Input, Text} from 'native-base';
import RadioButtonGroup, {
  RadioLayout,
} from '../../../shared/components/RadioButtonGroup';
import {ColorPalette} from '../../../shared/utils/colors';
import Snackbar from 'react-native-snackbar';
import {formApi} from '../../../api/form';
import Loader from '../../../shared/components/Loader';
import {useNavigation} from '@react-navigation/native';
import DogCounter from '../../../shared/components/DogCounter';

interface Props {
  survey: Survey;
}

const OwnedDog = (props: Props) => {
  const {id, name, date_created} = props.survey;
  const navigation = useNavigation();

  const userId = useSelector((state: RootState) => state).auth.me?.data.id;
  const [loading, setLoading] = useState(false);

  const {
    control,
    setValue,
    trigger,
    formState: {errors, isValid},
  } = useForm<any>({
    defaultValues: {
      age_group: null,
      age_of_pets: null,
      are_there_stray_dogs_near_your_home_place_of_work: null,
      are_you_scared_of_stray_dogs: null,
      are_your_pets_let_free_on_the_streets: null,
      are_your_pets_registered: null,
      are_your_pets_sterilized: null,
      do_you_have_secured_place_for_your_pets_at_your_place: null,
      do_you_know_that_MSAW_is_Ex_MSPCA: null,
      Do_you_know_that_the_MSAW_offers_free_sterilsation_for_your_dog: null,
      do_you_think_that_stray_dogs_should_be_removed_from_the_streets: null,
      do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation:
        null,
      education: null,
      gender: null,
      geo_location: {
        coordinates: null,
        type: CoordinateType.Point,
      },
      have_you_ever_adopted_a_pet_from_a_nonprofit_organisation: null,
      have_you_ever_fed_or_cared_for_a_stray_dog: null,
      have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet:
        null,
      have_you_ever_had_a_pet_which_got_lost: null,
      have_you_heard_of_the_CNR_project: null,
      How_many_male_and_female_dogs_do_you_have: null,
      How_many_pet_dogs__do_you_have: null,
      if_yes_state_reason_why: null,
      if_yes_state_which_reason: null,
      location: null,
      monthly_income_status_of_earner: null,
      staff: userId,
      status: 'Submitted',
      survey_information: id,
      what_are_your_suggestions_to_the_MSAW: null,
      what_is_your_opinion_about_the_MSAW: null,
      Which_veterinary_doctor_do_you_visit_for_your_pets: null,
      weather_condition: null,
    },
    resolver: yupResolver(schema.ownerSurveyResultSchema),
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setValue('geo_location', {
        coordinates: [info.coords.longitude, info.coords.latitude],
        type: CoordinateType.Point,
      });
    });
  }, [setValue]);

  const onSubmit = async () => {
    trigger();
    if (isValid) {
      try {
        setLoading(true);
        await formApi.submitStrayDogForm(control._formValues as SurveyResult);
        Snackbar.show({
          text: 'Form Submitted Successfully.',
          duration: Snackbar.LENGTH_LONG,
          marginBottom: 100,
          textColor: ColorPalette.green,
        });
        navigation.goBack();
      } catch (e) {
        Alert.alert('Error While submitting survey', JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    } else {
      Snackbar.show({
        text: 'Form contains errors.',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 100,
        backgroundColor: ColorPalette.primary,
      });
    }
  };

  return (
    <>
      <Text style={styles.formTitle}>General Info</Text>
      <Panel title="Survey" number={1}>
        <Input
          backgroundColor={ColorPalette.inputDisabled}
          placeholder="Survey Name"
          value={name}
          editable={false}
        />
      </Panel>
      <Panel title="Created on" number={2}>
        <Input
          justifyContent="center"
          alignItems="center"
          paddingLeft={10}
          backgroundColor={ColorPalette.inputDisabled}
          placeholder="Created on"
          value={convertDateString(date_created)}
          editable={false}
          leftElement={<Calendar color="black" style={{marginLeft: 5}} />}
        />
      </Panel>
      <Panel
        title="Location"
        number={3}
        hasError={!!errors.location}
        errorMessage={errors.location?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Enter Location of Survey"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="location"
        />
      </Panel>
      <Panel
        title="Weather Condition"
        number={4}
        hasError={!!errors.weather_condition}
        errorMessage={errors.weather_condition?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
              options={[
                WeatherCondition.SUNNY,
                WeatherCondition.RAINY,
                WeatherCondition.CLOUDY,
                WeatherCondition.LIGHT_SHOWER,
              ]}
            />
          )}
          name="weather_condition"
        />
      </Panel>
      <Text style={styles.formTitle}>Owner Info</Text>
      <Panel
        title="Gender"
        number={5}
        hasError={!!errors.gender}
        errorMessage={errors.gender?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={['Male', 'Female']}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="gender"
        />
      </Panel>
      <Panel
        title="Age group:"
        number={6}
        hasError={!!errors.age_group}
        errorMessage={errors.age_group?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={['18 - 25', '26 - 40', '41 - 60', '> 60']}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="age_group"
        />
      </Panel>
      <Panel
        title="Monthly Income status of Earner:"
        number={7}
        hasError={!!errors.monthly_income_status_of_earner}
        errorMessage={
          errors.monthly_income_status_of_earner?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[
                '≤ 15000 - 25000',
                '25000 - 45000',
                '45000 - 75000',
                '≥ 750000',
              ]}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="monthly_income_status_of_earner"
        />
      </Panel>
      <Panel
        title="Education:"
        number={8}
        hasError={!!errors.education}
        errorMessage={errors.education?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[
                'Undergraduate',
                'Graduate',
                'Technical',
                'Post-Graduate',
              ]}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="education"
        />
      </Panel>
      <Text style={styles.formTitle}>Dog Info</Text>
      <Panel
        title="How many pet dogs  do you have?"
        number={9}
        hasError={!!errors.How_many_pet_dogs__do_you_have}
        errorMessage={errors.How_many_pet_dogs__do_you_have?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={['0', '1 - 3', '4 - 6', '>7']}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="How_many_pet_dogs__do_you_have"
        />
      </Panel>
      <Panel
        title="How many male and female dogs do you have? "
        number={10}
        hasError={!!errors.How_many_male_and_female_dogs_do_you_have}
        errorMessage={
          errors.How_many_male_and_female_dogs_do_you_have?.message as string
        }>
        <DogCounter
          onChange={e =>
            setValue('How_many_male_and_female_dogs_do_you_have', e)
          }
        />
      </Panel>
      <Panel
        title="Age of pets"
        number={11}
        hasError={!!errors.age_of_pets}
        errorMessage={errors.age_of_pets?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Enter age of pets"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="age_of_pets"
        />
      </Panel>
      <Panel
        title="Are your pets registered?"
        number={12}
        hasError={!!errors.are_your_pets_registered}
        errorMessage={errors.are_your_pets_registered?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO, 'Not All']}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="are_your_pets_registered"
        />
      </Panel>
      <Panel
        title="Are your pets sterilised? "
        number={13}
        hasError={!!errors.are_your_pets_sterilized}
        errorMessage={errors.are_your_pets_sterilized?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO, 'Not All']}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="are_your_pets_sterilized"
        />
      </Panel>
      <Panel
        title="Which Veterinary doctor do you visit for your pet(s)? "
        number={14}
        hasError={!!errors.Which_veterinary_doctor_do_you_visit_for_your_pets}
        errorMessage={
          errors.Which_veterinary_doctor_do_you_visit_for_your_pets
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Enter name of your veterinary"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="Which_veterinary_doctor_do_you_visit_for_your_pets"
        />
      </Panel>

      <Panel
        title="Do you know that the MSAW offers free sterilsation for your dog? "
        number={15}
        hasError={
          !!errors.Do_you_know_that_the_MSAW_offers_free_sterilsation_for_your_dog
        }
        errorMessage={
          errors.Do_you_know_that_the_MSAW_offers_free_sterilsation_for_your_dog
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="Do_you_know_that_the_MSAW_offers_free_sterilsation_for_your_dog"
        />
      </Panel>
      <Panel
        title="Do you have secured place for your pets at your place?"
        number={16}
        hasError={
          !!errors.do_you_have_secured_place_for_your_pets_at_your_place
        }
        errorMessage={
          errors.do_you_have_secured_place_for_your_pets_at_your_place
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="do_you_have_secured_place_for_your_pets_at_your_place"
        />
      </Panel>
      <Panel
        title="Are your pets let free on the streets?"
        number={17}
        hasError={!!errors.are_your_pets_let_free_on_the_streets}
        errorMessage={
          errors.are_your_pets_let_free_on_the_streets?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="are_your_pets_let_free_on_the_streets"
        />
      </Panel>
      <Panel
        title="Have you ever had a pet which got lost ?"
        number={18}
        hasError={!!errors.have_you_ever_had_a_pet_which_got_lost}
        errorMessage={
          errors.have_you_ever_had_a_pet_which_got_lost?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="have_you_ever_had_a_pet_which_got_lost"
        />
      </Panel>
      <Panel
        title="Have you ever found yourself in a situation where you had to discard a pet ? "
        number={19}
        hasError={
          !!errors.have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet
        }
        errorMessage={
          errors
            .have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet"
        />
      </Panel>
      <Panel
        title="If yes, state which reason"
        number={20}
        hasError={!!errors.if_yes_state_which_reason}
        errorMessage={errors.if_yes_state_which_reason?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="State which reason"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="if_yes_state_which_reason"
        />
      </Panel>
      <Text style={styles.formTitle}>Stray Dogs</Text>
      <Panel
        title="Are there stray dogs near your home/ place of work?"
        number={21}
        hasError={!!errors.are_there_stray_dogs_near_your_home_place_of_work}
        errorMessage={
          errors.are_there_stray_dogs_near_your_home_place_of_work
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="are_there_stray_dogs_near_your_home_place_of_work"
        />
      </Panel>
      <Panel
        title="Are you scared of stray dogs? "
        number={22}
        hasError={!!errors.are_you_scared_of_stray_dogs}
        errorMessage={errors.are_you_scared_of_stray_dogs?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="are_you_scared_of_stray_dogs"
        />
      </Panel>
      <Panel
        title="If yes, state which reason"
        number={23}
        hasError={!!errors.if_yes_state_reason_why}
        errorMessage={errors.if_yes_state_reason_why?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="State which reason"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="if_yes_state_reason_why"
        />
      </Panel>
      <Panel
        title="Have you ever fed or cared for a stray dog? "
        number={24}
        hasError={!!errors.have_you_ever_fed_or_cared_for_a_stray_dog}
        errorMessage={
          errors.have_you_ever_fed_or_cared_for_a_stray_dog?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="have_you_ever_fed_or_cared_for_a_stray_dog"
        />
      </Panel>
      <Panel
        title="Have you ever adopted a pet from a non-profit organisation?"
        number={25}
        hasError={
          !!errors.have_you_ever_adopted_a_pet_from_a_nonprofit_organisation
        }
        errorMessage={
          errors.have_you_ever_adopted_a_pet_from_a_nonprofit_organisation
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="have_you_ever_adopted_a_pet_from_a_nonprofit_organisation"
        />
      </Panel>
      <Panel
        title="Do you think that stray dogs should be removed from the streets?"
        number={26}
        hasError={
          !!errors.do_you_think_that_stray_dogs_should_be_removed_from_the_streets
        }
        errorMessage={
          errors.do_you_think_that_stray_dogs_should_be_removed_from_the_streets
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="do_you_think_that_stray_dogs_should_be_removed_from_the_streets"
        />
      </Panel>
      <Panel
        title="Have you heard of the CNR project?"
        number={27}
        hasError={!!errors.have_you_heard_of_the_CNR_project}
        errorMessage={
          errors.have_you_heard_of_the_CNR_project?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="have_you_heard_of_the_CNR_project"
        />
      </Panel>
      <Panel
        title="Do you think that the stray should be released back to their place after sterilisation?"
        number={28}
        hasError={
          !!errors.do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation
        }
        errorMessage={
          errors
            .do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation
            ?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation"
        />
      </Panel>
      <Panel
        title="Do you know that MSAW is Ex-MSPCA?"
        number={29}
        hasError={!!errors.do_you_know_that_MSAW_is_Ex_MSPCA}
        errorMessage={
          errors.do_you_know_that_MSAW_is_Ex_MSPCA?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="do_you_know_that_MSAW_is_Ex_MSPCA"
        />
      </Panel>
      <Panel
        title="What is your opinion about the MSAW?"
        number={30}
        hasError={!!errors.what_is_your_opinion_about_the_MSAW}
        errorMessage={
          errors.what_is_your_opinion_about_the_MSAW?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="State which reason"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="what_is_your_opinion_about_the_MSAW"
        />
      </Panel>
      <Panel
        title="What are your suggestions to the MSAW? "
        number={31}
        hasError={!!errors.what_are_your_suggestions_to_the_MSAW}
        errorMessage={
          errors.what_are_your_suggestions_to_the_MSAW?.message as string
        }>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="State which reason"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="what_are_your_suggestions_to_the_MSAW"
        />
      </Panel>

      {loading && <Loader />}
      <HStack flexDirection="row-reverse" mt={5}>
        <Button
          onPress={() => onSubmit()}
          backgroundColor={
            isValid ? ColorPalette.primary : ColorPalette.disabledButton
          }>
          <Text color={ColorPalette.white}>Submit form</Text>
        </Button>
      </HStack>
    </>
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
export default OwnedDog;
