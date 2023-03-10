import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '..';

import { getAuthToken } from '../../../utils/auth';
import { makeRequest } from '../../../utils/makeRequest';

jest.mock('react-router-dom');
jest.mock('../../../utils/auth');
jest.mock('../../../utils/makeRequest');

describe('LoginPage', () => {
  it('renders correctly', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const view = render(<LoginPage />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('navigates to home page if user is already logged in', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    getAuthToken.mockReturnValue('token');

    render(<LoginPage />);
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('navigates to error page if login fails', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    makeRequest.mockRejectedValue({
      response: {
        status: 500,
      },
    });

    const view = render(<LoginPage />);
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

  it('navigates to home page if login succeeds', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    makeRequest.mockResolvedValue({
      response: {
        token: 'token',
      },
    });

    const view = render(<LoginPage />);
    const emailInput = view.container.querySelector('input[name="email"]');
    const passwordInput = view.container.querySelector(
      'input[name="password"]'
    );
    const submitButton = view.container.querySelector('button[type="submit"]');
    emailInput.value = 'a@b.com';
    passwordInput.value = 'pass';
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message if login fails', async () => {
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

    const view = render(<LoginPage />);
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
