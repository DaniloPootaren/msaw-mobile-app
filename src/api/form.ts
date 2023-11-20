import {BASE_URL} from '../shared/constants/url';
import {SurveyResult} from '../shared/models';
import {httpClient} from '../shared/utils/network';

const submitStrayDogForm = async (payload: SurveyResult) => {
  return httpClient().post(`${BASE_URL}/items/survey_results`, payload);
};

export const formApi = {submitStrayDogForm};
