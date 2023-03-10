// apiEndpoint = {
//   baseURL: BASE_URL
//   url: '',
//   method: ''
// }

import { AUTH_SERVER_BASE_URL, BACKEND_SERVER_BASE_URL } from './config';

export const loginApiEndpoint = {
  url: AUTH_SERVER_BASE_URL + '/api/login',
  method: 'POST',
};

export const registerApiEndpoint = {
  url: AUTH_SERVER_BASE_URL + '/api/users',
  method: 'POST',
};

export const getAllFormsApiEndpoint = {
  url: BACKEND_SERVER_BASE_URL + '/api/forms',
  method: 'GET',
};

export const editFormApiEndpoint = (formId) => {
  return {
    url: BACKEND_SERVER_BASE_URL + '/api/forms/' + formId,
    method: 'PUT',
  };
};

export const createFormApiEndpoint = {
  url: BACKEND_SERVER_BASE_URL + '/api/forms',
  method: 'POST',
};

export const createResponseApiEndpoint = {
  url: BACKEND_SERVER_BASE_URL + '/api/form-responses',
  method: 'POST',
};

export const editResponseApiEndpoint = (responseId) => {
  return {
    url: BACKEND_SERVER_BASE_URL + '/api/form-responses/' + responseId,
    method: 'PUT',
  };
};

export const deleteResponseApiEndpoint = (responseId) => {
  return {
    url: BACKEND_SERVER_BASE_URL + '/api/form-responses/' + responseId,
    method: 'DELETE',
  };
};
