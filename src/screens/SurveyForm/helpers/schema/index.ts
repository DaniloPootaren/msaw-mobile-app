import * as yup from 'yup';

const surveyResultSchema = yup.object({
  age: yup.string().required('Age is required.'),
  dog_breed: yup.number().required('Dog breed is required.'),
  geo_location: yup
    .object({
      coordinates: yup.array().of(yup.string()).required(),
      type: yup.string().required(),
    })
    .required(),
  has_microchip: yup
    .string()
    .required('Please select wether the dog has a microchip.'),
  health_state: yup.string().required('Health state is required'),
  identifying_marks: yup.string().nullable(),
  is_aggressive: yup.string().required('Is the dog aggressive?'),
  is_living_with_other_dogs: yup.string().required('This field is required'),
  is_sterilized: yup.string().required('This field is required'),
  microchip_serial: yup.string().nullable(),
  primary_image: yup.string().nullable(),
  remarks: yup.string().nullable(),
  sex: yup.string().required('This field is required'),
  staff: yup.string().required(),
  status: yup.string().required(),
  survey_information: yup.number().required(),
  weather_condition: yup.string().required('This field is required'),
  Location: yup.string().required('This field is required'),
});

export const schema = {surveyResultSchema};
