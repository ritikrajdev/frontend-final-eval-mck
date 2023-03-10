import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPage from '..';

import { getAuthToken } from '../../../utils/auth';
import { makeRequest } from '../../../utils/makeRequest';

jest.mock('react-router-dom');
jest.mock('../../../utils/auth');
jest.mock('../../../utils/makeRequest');

describe('RegisterPage', () => {
  it('renders correctly', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const view = render(<RegisterPage />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('navigates to home page if user is already logged in', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    getAuthToken.mockReturnValue('token');

    render(<RegisterPage />);
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('navigates to error page if register fails', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    makeRequest.mockRejectedValue({
      response: {
        status: 500,
      },
    });

    const view = render(<RegisterPage />);
    const emailInput = view.container.querySelector('input[name="email"]');
    const passwordInput = view.container.querySelector(
      'input[name="password"]'
    );
    const submitButton = view.container.querySelector('button[type="submit"]');

    emailInput.value = 'a@b.com';
    passwordInput.value = 'pass';
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/error');
    });
  });

  it('navigates to login page if register succeeds', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    makeRequest.mockResolvedValue({
      response: {
        token: 'token',
      },
    });

    const view = render(<RegisterPage />);
    const emailInput = view.container.querySelector('input[name="email"]');
    const passwordInput = view.container.querySelector(
      'input[name="password"]'
    );
    const submitButton = view.container.querySelector('button[type="submit"]');
    emailInput.value = 'a@b.com';
    passwordInput.value = 'pass';
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error message if register fails', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    makeRequest.mockRejectedValue({
      response: {
        status: 400,
        data: {
          message: 'error message',
        },
      },
    });

    const view = render(<RegisterPage />);
    const emailInput = view.container.querySelector('input[name="email"]');
    const passwordInput = view.container.querySelector(
      'input[name="password"]'
    );
    const submitButton = view.container.querySelector('button[type="submit"]');
    emailInput.value = 'a@b.com';
    passwordInput.value = 'pass';
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(view.container).toHaveTextContent('error message');
    });
  });
});
