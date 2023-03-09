// apiEndpoint = {
//   baseURL: BASE_URL
//   url: '',
//   method: ''
// }

import { AUTH_SERVER_BASE_URL } from './config';

export const loginApiEndpoint = {
  url: AUTH_SERVER_BASE_URL + '/api/login',
  method: 'POST',
};
