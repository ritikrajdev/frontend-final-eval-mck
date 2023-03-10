import axios from 'axios';
import { makeRequest } from '..';
import { getAuthToken } from '../../auth';

jest.mock('axios');
jest.mock('../../auth');

describe('makeRequest', () => {
  it('should call axios', async () => {
    axios.mockResolvedValue({
      data: 'some data',
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };
    const navigate = jest.fn();

    const result = await makeRequest(apiEndpoint, dynamicConfig, navigate);
    expect(axios).toHaveBeenCalled();
    expect(result).toEqual('some data');
  });

  it('should give priority to apiEndpoint', async () => {
    axios.mockResolvedValue({
      data: 'some data',
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { x: 2 };
    const navigate = jest.fn();

    await makeRequest(apiEndpoint, dynamicConfig, navigate);
    expect(axios).toHaveBeenCalledWith({
      x: 1,
    });
  });

  it('should call navigate on error', async () => {
    axios.mockRejectedValue(new Error('some error'));

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };
    const navigate = jest.fn();

    await makeRequest(apiEndpoint, dynamicConfig, navigate);
    expect(navigate).toHaveBeenCalled();
  });

  it('should throw error if navigate is not provided', async () => {
    axios.mockRejectedValue(new Error('some error'));

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };
    const navigate = null;

    await expect(
      makeRequest(apiEndpoint, dynamicConfig, navigate)
    ).rejects.toThrow('some error');
  });

  it('should add headers if authToken is present', async () => {
    getAuthToken.mockReturnValue('some token');
    axios.mockResolvedValue({
      data: 'some data',
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };

    await makeRequest(apiEndpoint, dynamicConfig);
    expect(axios).toHaveBeenCalledWith({
      x: 1,
      y: 2,
      headers: {
        Authorization: 'some token',
      },
    });
  });

  it('should add headers if authToken is present and headers are already present', async () => {
    getAuthToken.mockReturnValue('some token');
    axios.mockResolvedValue({
      data: 'some data',
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = {
      y: 2,
      headers: {
        z: 3,
      },
    };

    await makeRequest(apiEndpoint, dynamicConfig);
    expect(axios).toHaveBeenCalledWith({
      x: 1,
      y: 2,
      headers: {
        z: 3,
        Authorization: 'some token',
      },
    });
  });

  it('should remove auth token if 401', async () => {
    axios.mockRejectedValue({
      response: {
        status: 401,
      },
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };
    const navigate = jest.fn();

    await makeRequest(apiEndpoint, dynamicConfig, navigate);
    expect(navigate).toHaveBeenCalledWith('/login');
    expect(getAuthToken).toHaveBeenCalled();
  });

  it('should ot remove auth token if any other status code except 401', async () => {
    axios.mockRejectedValue({
      response: {
        status: 400,
      },
    });

    const apiEndpoint = { x: 1 };
    const dynamicConfig = { y: 2 };
    const navigate = jest.fn();

    await makeRequest(apiEndpoint, dynamicConfig, navigate);
    expect(navigate).toHaveBeenCalledWith('/error/400');
  });

  it('should use {} as default dynamicConfig', async () => {
    axios.mockResolvedValue({
      data: 'some data',
    });

    const apiEndpoint = { x: 1 };

    await makeRequest(apiEndpoint);
    expect(axios).toHaveBeenCalledWith({
      x: 1,
    });
  });
});
