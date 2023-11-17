import {BASE_URL} from '../shared/constants/url';
import {FetchBreedsResponse} from '../shared/models';
import {httpClient} from '../shared/utils/network';

const fetchDogBreeds = async (): Promise<{
  data: FetchBreedsResponse;
}> => {
  return await httpClient().get(`${BASE_URL}/items/breeds`);
};

export const breedApi = {fetchDogBreeds};
