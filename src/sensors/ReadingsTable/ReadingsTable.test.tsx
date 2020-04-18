import React from 'react';
import { render } from '@testing-library/react';
import {
  Column,
  ReadingsTable,
} from './ReadingsTable';

const mockData = [
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 672, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 193, "reading_ts": "2019-09-10T00:00:00"},
]

test('renders a row per entry in the supplied data', () => {
  const tree = render(
    <ReadingsTable
      data={mockData}
    />
  )

  const rows = tree.getAllByRole('row')
  expect(rows.length).toEqual(mockData.length + 1)
})

test('Columns specify fields and fieldnames', () => {
  const tree = render(
    <ReadingsTable
      data={mockData}
    >
      <Column
        field="id"
        heading="Sensor ID"
      />
      <Column
        field="reading"
        heading="Reading"
      />
      <Column
        field="reading_ts"
        heading="Timestamp"
      />
    </ReadingsTable>
  )

  const renderedHeadings = tree.getAllByRole('columnheader')
  expect(renderedHeadings.length).toEqual(3)

  const headings = ['Sensor ID', 'Reading', 'Timestamp']
  headings.forEach(heading => {
    const found = tree.getByText(heading)
    expect(found).toBeInTheDocument()
  })
})

