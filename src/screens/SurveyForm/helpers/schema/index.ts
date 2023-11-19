import * as yup from 'yup';

const surveyResultSchema = yup.object({
  age: yup.string().required(),
  dog_breed: yup.number().required(),
  geo_location: yup
    .object({
      coordinates: yup.array().of(yup.string()).required(),
      type: yup.string().required(),
    })
    .required(),
  has_microchip: yup.boolean().required(),
  health_state: yup.string().required(),
  identifying_marks: yup.string().required(),
  is_aggressive: yup.string().required(),
  is_living_with_other_dogs: yup.string().required(),
  is_sterilized: yup.string().required(),
  microchip_serial: yup.string().required(),
  primary_image: yup.string().required(),
  remarks: yup.string().required(),
  sex: yup.string().required(),
  staff: yup.string().required(),
  status: yup.string().required(),
  survey_information: yup.number().required(),
  weather_condition: yup.string().required(),
  Location: yup.string().required(),
});

export const schema = {surveyResultSchema};
