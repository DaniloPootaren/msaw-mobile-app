import React, {useEffect, useState} from 'react';
import Panel from '../../../shared/components/Panel';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import ImageUploader from '../../../shared/components/ImageUploader';
import {Alert, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Survey} from '../../../shared/models';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input, Select, Text} from 'native-base';
import RadioButtonGroup, {
  RadioLayout,
} from '../../../shared/components/RadioButtonGroup';
import {ColorPalette} from '../../../shared/utils/colors';
import {filesApi} from '../../../api/files';

interface Props {
  survey: Survey;
}

const StrayDog = (props: Props) => {
  const {id, name, date_created} = props.survey;
  const [hasMicrochip, setHasMicrochip] = useState<boolean | null>();
  const dogBreeds =
    useSelector((state: RootState) => state).appData.breeds?.data || [];
  const userId = useSelector((state: RootState) => state).auth.me?.data.id;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
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
      status: null,
      survey_information: id,
      weather_condition: null,
    },
    // resolver: yupResolver(schema.surveyResultSchema),
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setValue('geo_location', {
        coordinates: [info.coords.longitude, info.coords.latitude],
        type: CoordinateType.Point,
      });
    });
  }, [setValue]);

  const handleHasMicrochip = (val: YES_NO, callback: () => void) => {
    setHasMicrochip(val === YES_NO.YES);
    callback();
  };

  const handleImageUpload = async (imgURI: string) => {
    console.log('imgURI', imgURI);
    try {
      const data = (await filesApi.uploadImageFile(imgURI)).data;
      console.log('>>>', data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () =>
    Alert.alert('Test', JSON.stringify(control._formValues));

  return (
    <>
      <TouchableOpacity onPress={() => onSubmit()}>
        <Text>Test</Text>
      </TouchableOpacity>
      <Text style={styles.formTitle}>General Info</Text>
      <Panel title="Survey">
        <Input
          backgroundColor={ColorPalette.inputDisabled}
          placeholder="Survey Name"
          value={name}
          editable={false}
        />
      </Panel>
      <Panel title="Created on">
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
      <Panel title="Location">
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
      <Panel title="Weather Condition">
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
      <Panel title="Is the dog sterilized?">
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
      <Panel title="Sex:">
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
      <Panel title="Identifying Marks">
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Insert Identifying marks"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="identifying_marks"
        />
      </Panel>
      <Panel title="Age">
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
      <Panel title="Breed">
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
          name="breed"
        />
      </Panel>
      <Panel title="Health state">
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
      <Panel title="Aggressive">
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
      <Panel title="Living with other pets">
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
      <Panel title="Remarks">
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
      <Panel title="Does it has a microchip number?">
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={[YES_NO.YES, YES_NO.NO]}
              onChange={e => handleHasMicrochip(e as any, onChange)}
              layout={RadioLayout.LEFT}
              value={value}
              horizontal
            />
          )}
          name="is_sterilized"
        />
      </Panel>
      {hasMicrochip && (
        <Panel title="Insert microchip number">
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
