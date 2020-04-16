import React from 'react';
import { render } from '@testing-library/react';
import DataTable from './DataTable';

test('renders a table', () => {
  const { getByText } = render(<DataTable />);
  const cell = getByText(/heading/i);
  expect(cell).toBeInTheDocument();
});
