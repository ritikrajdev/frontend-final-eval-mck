import { render } from '@testing-library/react';
import React from 'react';
import Button from '..';

describe('Button', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a button', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.querySelector('button')).toBeInTheDocument();
  });
  it('should render a button with the correct text', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.querySelector('button')).toHaveTextContent('Click me');
  });
  it('should render a button with the correct type', () => {
    const { container } = render(<Button type='submit'>Click me</Button>);
    expect(container.querySelector('button')).toHaveAttribute('type', 'submit');
  });
});
