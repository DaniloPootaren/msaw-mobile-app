import {BASE_URL} from '../shared/constants/url';
import {ImageUploadResponse} from '../shared/models';
import {httpClient} from '../shared/utils/network';
import * as mime from 'mime';

const uploadImageFile = async (
  imageUri: string,
): Promise<{data: ImageUploadResponse}> => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: mime.getType(imageUri),
    name: 'image.jpg',
  });

  return await httpClient().post(`${BASE_URL}/files`, formData, {
    headers: {
      'content-Type': 'multipart/form-data',
    },
  });
};

export const filesApi = {uploadImageFile};
