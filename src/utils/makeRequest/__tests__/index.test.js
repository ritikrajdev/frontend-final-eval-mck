import axios from 'axios';
import { makeRequest } from '..';

jest.mock('axios');

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
});
