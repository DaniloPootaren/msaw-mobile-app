import React, {useEffect, useState} from 'react';
import Panel from '../../../shared/components/Panel';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import ImageUploader from '../../../shared/components/ImageUploader';
import {Alert, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Survey, SurveyResult} from '../../../shared/models';
import {
  CoordinateType,
  HealthCondition,
  PetAge,
  PetGender,
  WeatherCondition,
  YES_NO,
} from '../../../shared/enums';
import {schema} from '../helpers/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {convertDateString} from '../../../shared/utils/date';
import Calendar from '../../../assets/icons/calendar.svg';
import Geolocation from '@react-native-community/geolocation';
import {Button, HStack, Input, Select, Text} from 'native-base';
import RadioButtonGroup, {
  RadioLayout,
} from '../../../shared/components/RadioButtonGroup';
import {ColorPalette} from '../../../shared/utils/colors';
import {filesApi} from '../../../api/files';
import Snackbar from 'react-native-snackbar';
import {formApi} from '../../../api/form';
import Loader from '../../../shared/components/Loader';
import {useNavigation} from '@react-navigation/native';

interface Props {
  survey: Survey;
}

const StrayDog = (props: Props) => {
  const {id, name, date_created} = props.survey;
  const navigation = useNavigation();
  const [hasMicrochip, setHasMicrochip] = useState<boolean | null>();
  const dogBreeds =
    useSelector((state: RootState) => state).appData.breeds?.data || [];
  const userId = useSelector((state: RootState) => state).auth.me?.data.id;
  const [loading, setLoading] = useState(false);

  const {
    control,
    setValue,
    trigger,
    formState: {errors, isValid},
  } = useForm<any>({
    defaultValues: {
      age: null,
      dog_breed: null,
      geo_location: {
        coordinates: [],
        type: CoordinateType.Point,
      },
      has_microchip: null,
      health_state: null,
      identifying_marks: null,
      is_aggressive: null,
      is_living_with_other_dogs: null,
      is_sterilized: null,
      Location: null,
      microchip_serial: null,
      primary_image: null,
      remarks: null,
      sex: null,
      staff: userId,
      status: 'Submitted',
      survey_information: id,
      weather_condition: null,
    },
    resolver: yupResolver(schema.surveyResultSchema),
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setValue('geo_location', {
        coordinates: [info.coords.longitude, info.coords.latitude],
        type: CoordinateType.Point,
      });
    });
  }, [setValue]);

  const handleHasMicrochip = (val: YES_NO) => {
    setValue('has_microchip', val);
    setHasMicrochip(val === YES_NO.YES);
  };

  const handleImageUpload = async (imgURI: string) => {
    try {
      const response = (await filesApi.uploadImageFile(imgURI)).data;
      setValue('primary_image', response.data.id);
    } catch (e) {
      Alert.alert('Server Error', 'Could not upload image');
    }
  };

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
        hasError={!!errors.Location}
        errorMessage={errors.Location?.message as string}>
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
          name="Location"
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
      <Text style={styles.formTitle}>Dog Info</Text>
      <Panel
        title="Is the dog sterilized?"
        number={5}
        hasError={!!errors.is_sterilized}
        errorMessage={errors.is_sterilized?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="is_sterilized"
        />
      </Panel>
      <Panel
        title="Sex:"
        number={6}
        hasError={!!errors.sex}
        errorMessage={errors.sex?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[PetGender.MALE, PetGender.FEMALE]}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="sex"
        />
      </Panel>
      <Panel
        title="Identifying Marks"
        number={7}
        hasError={!!errors.identifying_marks}
        errorMessage={errors.identifying_marks?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Insert Identifying marks"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="identifying_marks"
        />
      </Panel>
      <Panel
        title="Age"
        number={8}
        hasError={!!errors.age}
        errorMessage={errors.age?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[PetAge.PUPPY, PetAge.ADULT, PetAge.OLD]}
              layout={RadioLayout.LEFT}
              onChange={onChange}
              value={value}
              horizontal
            />
          )}
          name="age"
        />
      </Panel>
      <Panel
        title="Breed"
        number={9}
        hasError={!!errors.dog_breed}
        errorMessage={errors.dog_breed?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Select
              minWidth="200"
              placeholder="Select animal breed"
              _selectedItem={{
                bg: 'teal.600',
              }}
              mt={1}
              onValueChange={onChange}>
              {dogBreeds.map(breed => (
                <Select.Item
                  label={breed.breed_name}
                  value={`${breed.id}`}
                  key={breed.id}
                />
              ))}
            </Select>
          )}
          name="dog_breed"
        />
      </Panel>
      <Panel
        title="Health state"
        number={10}
        hasError={!!errors.health_state}
        errorMessage={errors.health_state?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[
                HealthCondition.FAIR,
                HealthCondition.GOOD,
                HealthCondition.BAD,
              ]}
              onChange={onChange}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="health_state"
        />
      </Panel>
      <Panel
        title="Aggressive"
        number={11}
        hasError={!!errors.is_aggressive}
        errorMessage={errors.is_aggressive?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              value={value}
              horizontal
              layout={RadioLayout.LEFT}
            />
          )}
          name="is_aggressive"
        />
      </Panel>
      <Panel
        title="Living with other pets"
        number={12}
        hasError={!!errors.is_living_with_other_dogs}
        errorMessage={errors.is_living_with_other_dogs?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={onChange}
              value={value}
              horizontal
              layout={RadioLayout.LEFT}
            />
          )}
          name="is_living_with_other_dogs"
        />
      </Panel>
      <Panel
        title="Remarks"
        number={13}
        hasError={!!errors.remarks}
        errorMessage={errors.remarks?.message as string}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Insert Remarks"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="remarks"
        />
      </Panel>
      <Panel
        title="Does it has a microchip number?"
        number={14}
        hasError={!!errors.has_microchip}
        errorMessage={errors.has_microchip?.message as string}>
        <Controller
          control={control}
          render={({field: {value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={e => handleHasMicrochip(e as any)}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="has_microchip"
        />
      </Panel>
      {hasMicrochip && (
        <Panel
          title="Insert microchip number"
          number={15}
          hasError={!!errors.microchip_serial}
          errorMessage={errors.microchip_serial?.message as string}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Insert microchip number"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="microchip_serial"
          />
        </Panel>
      )}

      <ImageUploader onChange={handleImageUpload} />
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
export default StrayDog;
