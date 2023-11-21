import {BASE_URL} from '../shared/constants/url';
import {OwnerSurveyResult, SurveyResult} from '../shared/models';
import {transformYesNOValues} from '../shared/utils/mappers';
import {httpClient} from '../shared/utils/network';

const submitStrayDogForm = async (payload: SurveyResult) => {
  return httpClient().post(
    `${BASE_URL}/items/survey_results`,
    transformYesNOValues(payload),
  );
};

const submitOwnedDogForm = async (payload: OwnerSurveyResult) => {
  return httpClient().post(
    `${BASE_URL}/items/owned_survey_results`,
    transformYesNOValues(payload),
  );
};

export const formApi = {submitStrayDogForm, submitOwnedDogForm};
