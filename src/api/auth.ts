import axios from 'axios';
import {
  MAUPASS_GET_USER_PROFILE_URL,
  MAUPASS_LOGIN_URL,
} from '../shared/utils/maupass';
import {
  DirectusLoginResponse,
  DirectusLoginUserPayload,
  DirectusUser,
  MaupassGetCurrentUserProfileResponse,
  MaupassLoginPayload,
  MaupassResponse,
  MeResponse,
  User,
} from '../shared/models';
import {BASE_URL} from '../shared/constants/url';

const loginViaMaupass = async (
  payload: MaupassLoginPayload,
): Promise<MaupassResponse> => {
  return await axios.post(MAUPASS_LOGIN_URL, {
    usernameOrEmailAddress: payload.usernameOrEmailAddress,
    password: payload.password,
  });
};

const getMaupassCurrentUser = async (
  accessToken: string,
): Promise<MaupassGetCurrentUserProfileResponse> => {
  return await axios.get(MAUPASS_GET_USER_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getUserbyEmail = async (
  email: string,
): Promise<{data: {data: User[]}}> => {
  return await axios.get(
    `${BASE_URL}/users?filter={ "email": { "_eq": "${email}" }}`,
  );
};

const logout = async (refresh_token: string): Promise<any> => {
  return await axios.post(`${BASE_URL}/auth/logout`, {
    refresh_token: refresh_token,
  });
};

const createuser = async (payload: DirectusUser): Promise<any> => {
  return await axios.post(`${BASE_URL}/users`, payload);
};

const directusLogin = async (
  payload: DirectusLoginUserPayload,
): Promise<{data: DirectusLoginResponse}> => {
  return await axios.post(`${BASE_URL}/auth/login`, payload);
};

const getMe = async (accessToken: string): Promise<{data: MeResponse}> => {
  return axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const authApi = {
  loginViaMaupass,
  getMaupassCurrentUser,
  getUserbyEmail,
  logout,
  createuser,
  directusLogin,
  getMe,
};
