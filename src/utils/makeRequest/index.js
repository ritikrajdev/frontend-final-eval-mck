import axios from 'axios';
import { ERROR_ROUTE, ERROR_WITH_CODE_ROUTE } from '../../constants/routes';

export async function makeRequest(apiEndpoint, dyamicConfig, navigate) {
  dyamicConfig = dyamicConfig ?? {};

  try {
    const response = await axios({
      ...dyamicConfig,
      ...apiEndpoint,
    });

    return response.data;
  } catch (err) {
    if (navigate) {
      if (err.response?.status) {
        navigate(ERROR_WITH_CODE_ROUTE(err.response.status));
      } else {
        navigate(ERROR_ROUTE);
      }
    } else {
      throw err;
    }
  }
}
