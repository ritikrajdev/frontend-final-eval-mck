import { render } from '@testing-library/react';
import React from 'react';
import ErrorPage from '..';

import { useParams } from 'react-router-dom';

jest.mock('react-router-dom');

describe('ErrorPage', () => {
  it('should render with error code when errorCode is in url', async () => {
    const errorCode = 500;
    useParams.mockReturnValue({
      errorCode,
    });
    const screen = render(<ErrorPage />);
    expect(screen.getByText(`Error: ${errorCode}`)).toBeTruthy();
  });

  it('should render with error only when errorCode is not in url', async () => {
    useParams.mockReturnValue({});
    const screen = render(<ErrorPage />);
    expect(screen.getByText(`Error`)).toBeTruthy();
  });

  it('should render with not found when not found when page not found', async () => {
    useParams.mockReturnValue({});
    const screen = render(<ErrorPage notFound={true} />);
    expect(screen.getByText(`Not Found`)).toBeTruthy();
  });
});
