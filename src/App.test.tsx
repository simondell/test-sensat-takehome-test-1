import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a header referencing Sensat', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sensat/i);
  expect(linkElement).toBeInTheDocument();
});
