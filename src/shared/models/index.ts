import {
  CoordinateType,
  HealthCondition,
  PetAge,
  PetGender,
  SurveyStatus,
  WeatherCondition,
  YES_NO,
} from '../enums';

export interface MaupassResponse {
  data: {
    result: {
      accessToken: string;
      encryptedAccessToken: string;
      expireInSeconds: number;
      shouldResetPassword: boolean;
      passwordResetCode: null;
      userId: number;
      requiresTwoFactorVerification: boolean;
      twoFactorAuthProviders: string[];
      twoFactorRememberClientToken: null;
      returnUrl: null;
      refreshToken: string;
      refreshTokenExpireInSeconds: number;
      shouldRegisterDevice: boolean;
    };
    targetUrl: null;
    success: boolean;
    error: null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
  };
}

export interface MaupassLoginPayload {
  usernameOrEmailAddress: string;
  password: string;
}

export interface MaupassGetCurrentUserProfileResponse {
  data: {
    result: Me;
    targetUrl: null;
    success: boolean;
    error: null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
  };
}

export type Me = {
  userName: string;
  name: string;
  surname: string;
  surnameAtBirth: string;
  gender: string;
  dateOfBirth: string;
  isCitizen: number;
  passportNumber: string;
  nic: string;
  isTwoFactorEnabled: boolean;
  otpPreference: null;
  creationTime: string;
  emailAddress: string;
  phoneNumber: string;
  fixedLineNumber: null;
  address: string;
  city: string;
  country: string;
  nationality: string;
  state: string;
  townVillage: string;
  zipCode: string;
  subLocalityId: number;
  townVillageId: number;
  subLocalityName: string;
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: null;
  title: null;
  description: null;
  tags: null;
  avatar: null;
  language: null;
  tfa_secret: null;
  status: string;
  role: string;
  token: null;
  last_access: string;
  last_page: null;
  provider: string;
  external_identifier: null;
  auth_data: null;
  email_notifications: true;
  appearance: null;
  theme_dark: null;
  theme_light: null;
  theme_light_overrides: null;
  theme_dark_overrides: null;
  address: null;
  citizen_of_mauritius: null;
  date_of_birth: null;
  fixed_line_number: null;
  gender: null;
  mobile_number: null;
  nic: null;
  surname_at_birth: null;
  town: null;
}

export interface DirectusUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  surname_at_birth: string;
  gender: string;
  date_of_birth: string;
  citizen_of_mauritius: boolean;
  nic: string;
  address: string;
  town: string;
  fixed_line_number: any;
  mobile_number: string;
}

export interface DirectusLoginUserPayload {
  email: string;
  password: string;
}

export interface DirectusLoginResponse {
  data: {
    access_token: string | undefined | null;
    expires: number;
    refresh_token: string;
  };
}

export interface MeResponse {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    location: any;
    title: any;
    description: any;
    tags: any;
    avatar: any;
    language: any;
    tfa_secret: any;
    status: string;
    role: any;
    token: any;
    last_access: string;
    last_page: string;
    provider: string;
    external_identifier: null;
    auth_data: null;
    email_notifications: boolean;
    appearance: null;
    theme_dark: null;
    theme_light: null;
    theme_light_overrides: null;
    theme_dark_overrides: null;
    address: string;
    citizen_of_mauritius: number;
    fixed_line_number: null;
    gender: string;
    mobile_number: string;
    nic: string;
    surname_at_birth: string;
    town: string;
    date_of_birth: string;
  };
}

export interface Survey {
  constituencies: number;
  date_created: string;
  date_updated: string;
  end_date: string;
  id: number;
  is_closed: boolean;
  name: string;
  region: number;
  staff: string;
  start_date: string;
  status: string;
  user_created: string;
  user_updated: string;
  survey_results: number[];
}

export interface GetOpenSurveysResponse {
  data: Survey[];
}

export interface SurveyResult {
  age: PetAge | null;
  dog_breed: number | null;
  geo_location: {
    coordinates: number[] | null;
    type: CoordinateType | null;
  };
  has_microchip: boolean | null;
  health_state: HealthCondition | null;
  identifying_marks: string | null;
  is_aggressive: YES_NO | null;
  is_living_with_other_dogs: YES_NO | null;
  is_sterilized: YES_NO | null;
  microchip_serial: string | null;
  primary_image: string | null;
  remarks: string | null;
  sex: PetGender | null;
  staff: string | null;
  status: SurveyStatus | null;
  survey_information: number | null;
  weather_condition: WeatherCondition | null;
  Location: string | null;
}

export interface Breed {
  breed_name: string;
  date_created: string;
  date_updated: string;
  id: number;
}

export interface FetchBreedsResponse {
  data: Breed[];
}

export interface BindValue {
  value: any;
  bind: string;
}

export interface ImageUploadResponse {
  data: {
    id: string;
    storage: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    folder: string;
    uploaded_by: string;
    uploaded_on: string;
    modified_by: null;
    modified_on: string;
    charset: string;
    filesize: number;
    width: number;
    height: number;
    duration: number;
    embed: number;
    description: string;
    location: string;
    tags: string;
    metadata: {};
  };
}

export interface OwnerSurveyResult {
  Do_you_know_that_the_MSAW_offers_free_sterilsation_for_your_dog:
    | string
    | null;
  How_many_male_and_female_dogs_do_you_have: string | null;
  How_many_pet_dogs__do_you_have: string | null;
  Which_veterinary_doctor_do_you_visit_for_your_pets: string | null;
  age_group: string | null;
  age_of_pets: string | null;
  are_there_stray_dogs_near_your_home_place_of_work: string | null;
  are_you_scared_of_stray_dogs: string | null;
  are_your_pets_let_free_on_the_streets: string | null;
  are_your_pets_registered: string | null;
  are_your_pets_sterilized: string | null;
  date_created: string | null;
  date_updated: string | null;
  do_you_have_secured_place_for_your_pets_at_your_place: string | null;
  do_you_know_that_MSAW_is_Ex_MSPCA: string | null;
  do_you_think_that_stray_dogs_should_be_removed_from_the_streets:
    | string
    | null;
  do_you_think_that_the_stray_should_be_released_back_to_their_place_after_sterilisation:
    | string
    | null;
  education: string | null;
  gender: string | null;
  geo_location: {
    coordinates: number[] | null;
    type: CoordinateType;
  };
  have_you_ever_adopted_a_pet_from_a_nonprofit_organisation: string | null;
  have_you_ever_fed_or_cared_for_a_stray_dog: string | null;
  have_you_ever_found_yourself_in_a_situation_where_you_had_to_discard_a_pet:
    | string
    | null;
  have_you_ever_had_a_pet_which_got_lost: string | null;
  have_you_heard_of_the_CNR_project: string | null;
  if_yes_state_reason_why: string | null;
  if_yes_state_which_reason: string | null;
  location: string | null;
  monthly_income_status_of_earner: string | null;
  staff: string | null;
  status: string | null;
  survey_information: number;
  what_are_your_suggestions_to_the_MSAW: string | null;
  what_is_your_opinion_about_the_MSAW: string | null;
}
