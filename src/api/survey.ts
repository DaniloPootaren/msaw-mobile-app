import {BASE_URL} from '../shared/constants/url';
import {GetOpenSurveysResponse} from '../shared/models';
import {httpClient} from '../shared/utils/network';

const getActiveSurveysByUserId = async (
  userId: string,
): Promise<{
  data: GetOpenSurveysResponse;
}> => {
  return await httpClient().get(
    `${BASE_URL}/items/survey?filter={ "status": { "_eq": "published" },"staff": {"_eq":"${userId}"},"is_closed": {"_eq": false}}`,
  );
};

export const surveyApi = {getActiveSurveysByUserId};
