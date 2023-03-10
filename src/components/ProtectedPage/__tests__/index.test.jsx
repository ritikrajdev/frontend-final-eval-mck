import { render } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedPage from '..';
import { getAuthToken } from '../../../utils/auth';

jest.mock('react-router-dom');
jest.mock('../../../utils/auth');

describe('ProtectedPage', () => {
  it('should render correctly', async () => {
    getAuthToken.mockReturnValue('token');

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { asFragment } = render(<ProtectedPage>Yo</ProtectedPage>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect to login page if no auth token', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<ProtectedPage>Yo</ProtectedPage>);
    expect(navigate).toBeCalledWith('/login');
  });
});
