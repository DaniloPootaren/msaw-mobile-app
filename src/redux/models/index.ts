import {
  DirectusLoginResponse,
  FetchBreedsResponse,
  GetOpenSurveysResponse,
  MeResponse,
} from '../../shared/models';

export interface AuthState extends DirectusLoginResponse {
  me: MeResponse | null;
}

export interface AppDataState {
  breeds: FetchBreedsResponse | null;
  surveys: GetOpenSurveysResponse | null;
}
