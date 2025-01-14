import { apiService } from './apiWrapper';

/////////POST REQUESTS///////////

export const SOCIAL_LOGIN = (body) => {
  return apiService('auth/social-login', 'POST', body);
};

export const SIGNIN = (body) => {
  return apiService('auth/login', 'POST', { ...body });
};

export const SIGN_UP = (body) => {
  return apiService('auth/signup', 'POST', body);
};
export const VERIFY_OTP = (body) => {
  return apiService('auth/verify-otp', 'POST', body);
};

export const VERIFY_EMAIL = (body) => {
  return apiService('auth/recover-acc', 'POST', body);
};
export const CHANGE_PASSWORD = (body) => {
  return apiService('auth/change-password', 'POST', body);
};
export const ADD_GRID = (body) => {
  return apiService('grid', 'POST', body);
};

/////////GET REQUESTS///////////
export const AUTH_ME = () => {
  return apiService('auth/auth-me', 'GET');
};
export const GRID_ACTIONS = () => {
  return apiService('grid-action', 'GET');
};
export const GET_GRIDS = (params) => {
  return apiService(`grid?${params}`, 'GET');
};
export const GET_GRID_DATA = (params) => {
  return apiService(`grid-data?${params}`, 'GET');
};

/////////PUT REQUESTS///////////
export const EDIT_GRID_DATA = (id, body) => {
  return apiService(`grid-data/${id}`, 'PUT', body);
};

/////////DELETE REQUESTS///////////
export const DELETE_GRID_DATA = (id) => {
  return apiService(`grid-data/${id}`, 'DELETE');
};
