import axios from 'axios';
import { ERROR_ROUTE } from '../../constants/routes';

export async function makeRequest(apiEndpoint, dyamicConfig, navigate) {
  dyamicConfig = dyamicConfig ?? {};

  try {
    const response = await axios({
      ...dyamicConfig,
      ...apiEndpoint,
    });

    return response.data;
  } catch (err) {
    navigate(ERROR_ROUTE);
  }
}
