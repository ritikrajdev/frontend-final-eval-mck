import axios from 'axios';
import {
  ERROR_ROUTE,
  ERROR_WITH_CODE_ROUTE,
  LOGIN_ROUTE,
} from '../../constants/routes';
import { getAuthToken, removeAuthToken } from '../auth';

export async function makeRequest(apiEndpoint, dyamicConfig, navigate) {
  dyamicConfig = dyamicConfig ?? {};

  const authToken = getAuthToken();
  if (authToken) {
    if (dyamicConfig.headers) {
      dyamicConfig.headers['Authorization'] = authToken;
    } else {
      dyamicConfig.headers = { Authorization: authToken };
    }
  }

  try {
    const response = await axios({
      ...dyamicConfig,
      ...apiEndpoint,
    });

    return response.data;
  } catch (err) {
    if (navigate) {
      if (err.response?.status) {
        if (err.response.status === 401) {
          removeAuthToken();
          navigate(LOGIN_ROUTE);
        }
        navigate(ERROR_WITH_CODE_ROUTE(err.response.status));
      } else {
        navigate(ERROR_ROUTE);
      }
    } else {
      throw err;
    }
  }
}
