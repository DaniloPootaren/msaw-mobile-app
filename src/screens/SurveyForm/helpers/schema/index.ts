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

const ownerSurveyResultSchema = yup.object().shape({
  Do_you_know_that_the_MSAW_offers_free_sterilisation_for_your_dog: yup
    .string()
    .required('Field required'),
  How_many_male_and_female_dogs_do_you_have: yup
    .string()
    .required('Field required'),
  How_many_pet_dogs__do_you_have: yup.string().required('Field required'),
  Which_veterinary_doctor_do_you_visit_for_your_pets: yup
    .string()
    .required('Field required'),
  age_group: yup.string().required('Field required'),
  age_of_pets: yup.string().required('Field required'),
  are_there_stray_dogs_near_your_home_place_of_work: yup
    .string()
    .required('Field required'),
  are_you_scared_of_stray_dogs: yup.string().required('Field required'),
  are_your_pets_let_free_on_the_streets: yup
    .string()
    .required('Field required'),
  are_your_pets_registered: yup.string().required('Field required'),
  are_your_pets_sterilised: yup.string().required('Field required'),
  do_you_have_secured_place_for_your_pets_at_your_place: yup
    .string()
    .required('Field required'),
  do_you_know_that_MSAW_is_Ex_MSPCA: yup.string().required('Field required'),
  do_you_think_that_stray_dogs_should_be_removed_from_the_streets: yup
    .string()
    .required('Field required'),
  do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation:
    yup.string().required('Field required'),
  education: yup.string().required('Field required'),
  gender: yup.string().required('Field required'),
  geo_location: yup
    .object({
      coordinates: yup.array().nullable(),
      type: yup.string().required('Field required'),
    })
    .required('Field required'),
  have_you_ever_adopted_a_pet_from_a_nonprofit_organisation: yup
    .string()
    .required('Field required'),
  have_you_ever_fed_or_cared_for_a_stray_dog: yup
    .string()
    .required('Field required'),
  have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet:
    yup.string().required('Field required'),
  have_you_ever_had_a_pet_which_got_lost: yup
    .string()
    .required('Field required'),
  have_you_heard_of_the_CNR_project: yup.string().required('Field required'),
  if_yes_state_reason_why: yup.string().nullable(),
  if_yes_state_which_reason: yup.string().nullable(),
  location: yup.string().required('Field required'),
  monthly_income_status_of_earner: yup.string().required('Field required'),
  staff: yup.string().required('Field required'),
  status: yup.string().required('Field required'),
  survey_information: yup.number().required('Field required'),
  what_are_your_suggestions_to_the_MSAW: yup
    .string()
    .required('Field required'),
  what_is_your_opinion_about_the_MSAW: yup.string().required('Field required'),
  weather_condition: yup.string().required('Field required'),
});

export const schema = {surveyResultSchema, ownerSurveyResultSchema};
