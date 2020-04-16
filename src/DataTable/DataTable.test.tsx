import React from 'react';
import { render } from '@testing-library/react';
import DataTable from './DataTable';

const mockData = [
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 672, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 193, "reading_ts": "2019-09-10T00:00:00"},
]

test('renders a row per entry in the supplied data', () => {
  const { getByText } = render(
    <DataTable
      data={mockData}
    />
  )

  for(const row of mockData) {
    const cell = getByText(new RegExp(row.name))
    expect(cell).toBeInTheDocument()
  }
});
