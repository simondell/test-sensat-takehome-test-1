import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElement
} from '@testing-library/react'
import {
  Column,
  DataGrid,
} from './DataGrid'

const mockData = [
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 672, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 193, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-CO", "box_id": "Box-A1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 331, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-TEMP", "box_id": "Box-A1", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 50, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-RH", "box_id": "Box-A1", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 73, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-O3", "box_id": "Box-A2", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 273, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-NO2", "box_id": "Box-A2", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 601, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-CO", "box_id": "Box-A2", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 378, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-TEMP", "box_id": "Box-A2", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 74, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-RH", "box_id": "Box-A2", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 0, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-O3", "box_id": "Box-B1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 618, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-NO2", "box_id": "Box-B1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 7, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-CO", "box_id": "Box-B1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 137, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-TEMP", "box_id": "Box-B1", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 50, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-RH", "box_id": "Box-B1", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 71, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-O3", "box_id": "Box-B2", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 236, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-NO2", "box_id": "Box-B2", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 628, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-CO", "box_id": "Box-B2", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 376, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-TEMP", "box_id": "Box-B2", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 14, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-RH", "box_id": "Box-B2", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 71, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 207, "reading_ts": "2019-09-10T00:30:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 354, "reading_ts": "2019-09-10T00:30:00"},
  {"id": "Box-A1-CO", "box_id": "Box-A1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 917, "reading_ts": "2019-09-10T00:30:00"},
]

test('renders at max rows of the supplied data', () => {
  const expectedpageSize = 10

  const tree = render(
    <DataGrid
      data={mockData}
      pageSize={expectedpageSize}
    >
      <Column
        field="id"
        heading="Sensor ID"
      />
    </DataGrid>
  )

  const rows = tree.getAllByRole('row')
  expect(rows.length).toEqual(expectedpageSize + 1)
})

test('pagination controls which page of rows to display', async () => {
  const tree = render(
    <DataGrid
      data={mockData}
      pageSize={5}
    >
      <Column
        field="id"
        heading="Sensor ID"
      />
      <Column
        field="reading"
        heading="Reading"
      />
    </DataGrid>
  )

  const forward = tree.getByText(/next/i)
  fireEvent.click(forward)
  fireEvent.click(forward)
  const boxB1 = await waitForElement(() => tree.getByText('Box-B1-O3'))
  expect(boxB1).toBeInTheDocument()

  const backwards = tree.getByText(/prev/i)
  fireEvent.click(backwards)
  const boxA2 = await waitForElement(() => tree.getByText('Box-A2-O3'))
  expect(boxA2).toBeInTheDocument()
})

test('Columns specify fields and fieldnames', () => {
  const tree = render(
    <DataGrid
      data={mockData}
      pageSize={10}
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
    </DataGrid>
  )

  const renderedHeadings = tree.getAllByRole('columnheader')
  expect(renderedHeadings.length).toEqual(3)

  const headings = ['Sensor ID', 'Reading', 'Timestamp']
  headings.forEach(heading => {
    const found = tree.getByText(heading)
    expect(found).toBeInTheDocument()
  })
})

test('sort by column heading', async () => {
  const tree = render(
    <DataGrid
      data={mockData}
      pageSize={5}
    >
      <Column
        field="id"
        heading="Sensor ID"
        sortable
      />
      <Column
        field="reading"
        heading="Reading"
      />
      <Column
        field="reading_ts"
        heading="Timestamp"
      />
    </DataGrid>
  )

  const sortBySensorId = tree.getByTitle(/Ascending sort by/i)
  fireEvent.click(sortBySensorId)

  // wait for pagination (implementation detail; brittle)
  await waitForElement(() => tree.getByText(/prev/i))

  expect(tree.getAllByText('Box-A1-CO').length).toEqual(2)
  expect(tree.getAllByText('Box-A1-NO2').length).toEqual(2)
  expect(tree.getAllByText('Box-A1-O3').length).toEqual(1)
})

test('clear sort by clicking sort button a second time', async () => {
  const pageSize = 5
  const tree = render(
    <DataGrid
      data={mockData}
      pageSize={pageSize}
    >
      <Column
        field="id"
        heading="Sensor ID"
        sortable
      />
      <Column
        field="reading"
        heading="Reading"
      />
      <Column
        field="reading_ts"
        heading="Timestamp"
      />
    </DataGrid>
  )

  const sortBySensorId = tree.getByTitle(/Ascending sort by/i)
  fireEvent.click(sortBySensorId)
  fireEvent.click(sortBySensorId)

  // wait for pagination (implementation detail; brittle)
  await waitForElement(() => tree.getByText(/prev/i))

  const expectedIds = mockData
    .splice(0, pageSize)
    .map(reading => reading.id)

  for(const id of expectedIds) {
    expect(tree.getByText(id)).toBeInTheDocument()
  }
})