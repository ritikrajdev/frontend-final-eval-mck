import { render } from '@testing-library/react';
import React from 'react';
import Input from '..';

describe('Input', () => {
  it('should render with all the inputs', () => {
    const view = render(
      <Input
        label='Email'
        name='email'
        placeholder='Enter your email'
        type='email'
        onChange={() => {}}
        value='yo'
      />
    );

    expect(view.getByText('Email')).toBeTruthy();
    expect(view.asFragment()).toMatchSnapshot();
  });
});
