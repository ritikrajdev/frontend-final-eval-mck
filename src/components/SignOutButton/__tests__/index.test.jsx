import { render, screen } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignOutButton from '..';
import { removeAuthToken } from '../../../utils/auth';

jest.mock('react-router-dom');
jest.mock('../../../utils/auth');

describe('SignOutButton', () => {
  it('renders a button', () => {
    useNavigate.mockReturnValue(jest.fn());
    render(<SignOutButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call removeAuthToken and navigate onn buttonClick', () => {
    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(<SignOutButton />);

    screen.getByRole('button').click();
    expect(removeAuthToken).toBeCalled();
    expect(navigate).toBeCalled();
  });
});
